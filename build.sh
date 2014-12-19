~/apache-tomcat-7.0.37/bin/shutdown.sh
ant clean
ant war
rm -rf ~/apache-tomcat-7.0.37/webapps/ROOT
cp dist/ROOT.war ~/apache-tomcat-7.0.37/webapps/
~/apache-tomcat-7.0.37/bin/catalina.sh jpda run
