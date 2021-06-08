---
title: RESTful资源命名规范
date: 2021-06-08T10:45:32.169Z
description: 资源路径如何正确的定义？应该遵守怎样的命名规范？
---

> 资源可以是单例或者集合，比如说，customers是一个集合资源，customer是一个单个资源。我们在URI中可以用"/customers"来定义集合资源，用"/customers/{customerId}"来定义单个资源。

> 一个资源也可以包含子集合资源，比如说，一个顾客他名下有多个account，我们可以这样"/customers/{customerId}/accounts"表示。相同的，单独表示某个顾客的某个账号，我们可以这样"/customers/{customerId}/accounts/{accountId}"。

## Tips
1. 使用名词表示资源（而不是动词）


2. 使用"/"表示层次关系

```url
http://api.example.com/customers/{customerId}/accounts/{accountId}
```


3. 结尾不需要加"/"

```url
http://api.example.com/device-management/managed-devices/

//better
http://api.example.com/device-management/managed-devices
```

4. 用"-"代替驼峰的命名方式，提高可读性,
   也不要使用下划线"_"（某些字体下会显示不明显，或者被遮盖）

```url
http://api.example.com/inventoryManagement/managedEntities/{id}/installScriptLocation 

http://api.example.com/inventory_management/managed_entities/{id}/install_script_location

//better
http://api.example.com/inventory-management/managed-entities/{id}/install-script-location
```

5. 使用小写字母


6. 不要加文件后缀

```url
http://api.example.com/device-management/managed-devices.xml  /*Do not use it*/

http://api.example.com/device-management/managed-devices 	/*This is correct URI*/
```

7. 不要使用CRUD的一些方法名词（例如：getXXX，deletXXX，与第一点类似）

```url
HTTP GET http://api.example.com/device-management/managed-devices  //Get all devices
HTTP POST http://api.example.com/device-management/managed-devices  //Create new Device

HTTP GET http://api.example.com/device-management/managed-devices/{id}  //Get device for given Id
HTTP PUT http://api.example.com/device-management/managed-devices/{id}  //Update device for given Id
HTTP DELETE http://api.example.com/device-management/managed-devices/{id}  //Delete device for given Id
```


8. 用query形式来过滤资源集合（区别于params形式，理解）
```url
http://api.example.com/device-management/managed-devices

http://api.example.com/device-management/managed-devices?region=USA
http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ
http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ&sort=installation-date
```


## 参考： *https://restfulapi.net/resource-naming*
