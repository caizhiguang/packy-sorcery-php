/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50516
Source Host           : localhost:3306
Source Database       : lprete_blog

Target Server Type    : MYSQL
Target Server Version : 50516
File Encoding         : 65001

Date: 2013-03-11 14:44:14
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_tags
-- ----------------------------

-- ----------------------------
-- Table structure for `p_tasks`
-- ----------------------------
DROP TABLE IF EXISTS `p_tasks`;
CREATE TABLE `p_tasks` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '任务名称',
  `content` blob COMMENT '任务详细',
  `tags` varchar(150) DEFAULT NULL COMMENT '任务标签id',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `uid` int(255) DEFAULT NULL COMMENT '用户ID',
  `state` int(1) NOT NULL COMMENT '0待办，1完成',
  `important` int(1) NOT NULL COMMENT '高亮',
  `complete` int(1) NOT NULL COMMENT '完成状态',
  `priority` int(1) NOT NULL COMMENT '0~9优先级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_tasks
-- ----------------------------
INSERT INTO p_tasks VALUES ('53', '任务详细功能', '', null, '2013-02-27 15:21:13', '2013-02-27 15:21:13', null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('54', '右面日历页', '', null, '2013-02-27 15:30:01', '2013-02-27 15:30:01', null, '0', '0', '1', '0');

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
