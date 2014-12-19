package com.candikrush.helpers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.TimeZoneRegistry;
import net.fortuna.ical4j.model.TimeZoneRegistryFactory;
import net.fortuna.ical4j.model.ValidationException;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.parameter.Cn;
import net.fortuna.ical4j.model.parameter.Role;
import net.fortuna.ical4j.model.property.Attendee;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Uid;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.UidGenerator;

public class CalenderInviteService {

	public static Calendar CreateICalender(long startTime, long duration, String eventName, String mailTo) throws Exception{
		// Create a TimeZone
		TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry();
		TimeZone timezone = registry.getTimeZone("Asia/Kolkata");
		VTimeZone tz = ((net.fortuna.ical4j.model.TimeZone) timezone).getVTimeZone();

		java.util.Calendar startDate = new GregorianCalendar();
		startDate.setTimeZone(timezone);
		startDate.setTimeInMillis(startTime);

		java.util.Calendar endDate = new GregorianCalendar();
		endDate.setTimeZone(timezone);
		endDate.setTimeInMillis(startTime+duration);

		// Create the event
		DateTime start = new DateTime(startDate.getTime());
		DateTime end = new DateTime(endDate.getTime());
		VEvent meeting = new VEvent(start, end, eventName);

		// add timezone info..
		meeting.getProperties().add(tz.getTimeZoneId());

		// generate unique identifier..
		UidGenerator ug = new UidGenerator("1");
		Uid uid = ug.generateUid();
		meeting.getProperties().add(uid);

//		// add attendees..
		Attendee dev1 = new Attendee(URI.create("mailto:"+mailTo));
		dev1.getParameters().add(Role.REQ_PARTICIPANT);
		dev1.getParameters().add(new Cn("Developer 1"));
		meeting.getProperties().add(dev1);

		// Create a calendar
		Calendar icsCalendar = new Calendar();
		icsCalendar.getProperties().add(new ProdId("-//Events Calendar//iCal4j 1.0//EN"));
		icsCalendar.getProperties().add(CalScale.GREGORIAN);
		icsCalendar.getProperties().add(Version.VERSION_2_0);

		icsCalendar.getComponents().add(meeting);
		return icsCalendar;
	}


	/**
	 * Converts {@link net.fortuna.ical4j.model.Calendar} to a byte[]
	 *
	 * @param iCalendar {@link Calendar}
	 * @return byte[] of the Calendar
	 * @throws Exception 
	 * @throws HstComponentException if the Calendar is invalid or its output can't be written
	 */
	public static byte[] calendarAsByteArray(final Calendar iCalendar) throws Exception {
		byte[] bytes;
		try {
			ByteArrayOutputStream output;
			output = new ByteArrayOutputStream();
			CalendarOutputter outputter = new CalendarOutputter();
			outputter.output(iCalendar, output);
			bytes = output.toByteArray();
		} catch (ValidationException e) {
			e.printStackTrace();
			throw new Exception("Could not validate iCalendar", e);
		} catch (IOException e) {
			throw new Exception("Could not write iCalendar to stream", e);
		}
		return bytes;
	}

}
