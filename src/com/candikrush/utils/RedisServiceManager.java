package com.candikrush.utils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.*;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: bhuvangupta
 * Date: 25/09/12
 * Time: 9:18 PM
 * To change this template use File | Settings | File Templates.
 */
public class RedisServiceManager
{
    private static RedisServiceManager deviceDBRedisServiceManager = null;
    private static RedisServiceManager metadataRedisServiceManager = null;
    private JedisPool redisPool;

    public static final int DEFAULT_TIMEOUT = 5000;
    public static final String CONTEST = "contest";



    public static synchronized RedisServiceManager getDeviceDBInstance()
    {
        if (deviceDBRedisServiceManager == null)
        {
            String redis_ip = "103.15.227.79"; //Config.getDeviceDBInstance().getProperty("REDIS_IP");
            int redis_port = 6379; //Config.getDeviceDBInstance().getIntProperty("REDIS_PORT");
            deviceDBRedisServiceManager = new RedisServiceManager(redis_ip,
                    redis_port, 0);
        }
        return deviceDBRedisServiceManager;
    }

    public static synchronized RedisServiceManager getMetadataInstance()
    {
        if (deviceDBRedisServiceManager == null)
        {
            String redis_ip = "103.15.227.79"; //Config.getDeviceDBInstance().getProperty("REDIS_IP");
            int redis_port = 6379; //Config.getDeviceDBInstance().getIntProperty("REDIS_PORT");
            metadataRedisServiceManager = new RedisServiceManager(redis_ip,
                    redis_port, 0);
        }
        return metadataRedisServiceManager;
    }

    private RedisServiceManager(String redisHost, int redisPort, int dbnum)
    {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxActive(300);
        poolConfig.setMaxIdle(100);
        poolConfig.setMinIdle(30);
        poolConfig.setMaxWait(3000);
        redisPool = new JedisPool(poolConfig, redisHost, redisPort, DEFAULT_TIMEOUT, null, dbnum);
    }

    public Set<String> hkeys(String field)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hkeys(field);
        }
        catch (Exception e)
        {
            return null;
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }


    public List<String> hvals(String field)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hvals(field);
        }
        catch (Exception e)
        {
            return null;
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public List<String> hmget(String key, String[] fields)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            List<String> values = redis.hmget(key, fields);
            return values;
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public String hget(String key, String field)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            String val = redis.hget(key, field);
            // if(field.endsWith("/s"))
            // System.out.println(System.currentTimeMillis()+" - Using REDISS connection : "+redis+" to get "+val+" for "+field+"."+Thread.currentThread().toString());
            return val;
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public Map<String, String> hgetAll(String key)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hgetAll(key);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public void hrem(String key, String field)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            redis.hdel(key, field);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public Long hset(String key, String field, String value)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hset(key, field, value);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public Long hdel(String key, String field)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hdel(key, field);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public Long hsetnx(String key, String field, String value)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hsetnx(key, field, value);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    /**
     * Returns number of entries in a given hashmap
     *
     * @param mapName
     * @return
     */
    public Long hlen(String mapName)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.hlen(mapName);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public void hclear(String key)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            Set<String> fields = redis.hkeys(key);
            for (Iterator<String> fieldsItr = fields.iterator(); fieldsItr.hasNext(); )
            {
                String field = fieldsItr.next();
                redis.hdel(key, field);
            }

        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public Long lpush(String key, String value)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.lpush(key, value);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }

    public List<String> lrange(String key, long start,long end)
    {
        Jedis redis = null;
        try
        {
            redis = redisPool.getResource();
            return redis.lrange(key, start, end);
        }
        finally
        {
            if (redis != null)
            {
                redisPool.returnResource(redis);
            }
        }
    }
}
