#!/usr/bin/python
# -*- coding: UTF-8 -*-

import MySQLdb
import csv

# 打开数据库连接
db = MySQLdb.connect("10.4.6.222", "root", "123456", "diagnose", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL查询语句
sql ="select * from test"

# csv文件
csvFile=open('train1.csv','wb') #python3.5设置newline，否则两行之间会空一行,python 2.7将w改成wb
write=csv.writer(csvFile)
data=[0]*167
print len(data)
print data


try:
    # 执行SQL语句
    cursor.execute(sql)
    results=cursor.fetchall()
    data[0] =results[0][3]
    data[1]=results[0][2]
    print results[833][1]==results[832][1]
    for i in range(2691):
        sid = results[i][2]
        uid = results[i][1]
        mid = results[i][3]
        if uid==results[i-1][1]:
            print "第一个判断"
            if mid==results[i-1][3]:
                print "第二个判断"
                print sid
                data[sid]=sid

            else:
                print "第二个判断的else"
                write.writerow(data)#写入csv文件中
                data = [0] * 167
                print "写入csv"
                data[0]=mid
                data[sid]=sid

        else:
            print "第一个判断的else"
            write.writerow(data)
            print "写入csv"
            data = [0] * 167
            data[0] = mid
            data[sid] = sid
        print data
        print i
    write.writerow(data)
    print "数据写入成功！！！Y(^_^)Y"
except:
    print "error"


# 关闭数据库连接
db.close()
csvFile.close()