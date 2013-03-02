/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : lprete_blog

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2013-03-03 01:03:28
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `p_tags`
-- ----------------------------
DROP TABLE IF EXISTS `p_tags`;
CREATE TABLE `p_tags` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `ename` varchar(20) DEFAULT NULL,
  `uid` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_tags
-- ----------------------------

-- ----------------------------
-- Table structure for `p_tasks`
-- ----------------------------
DROP TABLE IF EXISTS `p_tasks`;
CREATE TABLE `p_tasks` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `content` blob,
  `tags` varchar(150) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `uid` int(255) DEFAULT NULL,
  `important` int(1) NOT NULL,
  `complete` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_tasks
-- ----------------------------
INSERT INTO `p_tasks` VALUES ('53', '任务详细功能', '', null, '2013-02-27 15:21:13', '2013-02-27 15:21:13', null, '0', '0');
INSERT INTO `p_tasks` VALUES ('54', '右面日历页', '', null, '2013-02-27 15:30:01', '2013-02-27 15:30:01', null, '0', '1');
INSERT INTO `p_tasks` VALUES ('55', '用户登入、注册功能', '', null, '2013-03-03 01:02:58', '2013-03-03 01:02:58', null, '0', '0');

-- ----------------------------
-- Table structure for `p_users`
-- ----------------------------
DROP TABLE IF EXISTS `p_users`;
CREATE TABLE `p_users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `gender` int(1) NOT NULL,
  `account` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `qq` varchar(12) DEFAULT NULL,
  `qq_api_key` varchar(50) DEFAULT NULL,
  `weibo` varchar(35) DEFAULT NULL,
  `weibo_api_key` varchar(50) DEFAULT NULL,
  `signin_time` datetime NOT NULL,
  `sginout_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_users
-- ----------------------------
