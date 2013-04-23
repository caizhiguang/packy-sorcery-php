/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50516
Source Host           : localhost:3306
Source Database       : lprete_blog

Target Server Type    : MYSQL
Target Server Version : 50516
File Encoding         : 65001

Date: 2013-04-23 16:44:12
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `p_system_setting`
-- ----------------------------
DROP TABLE IF EXISTS `p_system_setting`;
CREATE TABLE `p_system_setting` (
  `key` varchar(50) NOT NULL,
  `val` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_system_setting
-- ----------------------------
INSERT INTO p_system_setting VALUES ('tomato_clock', '1500');
INSERT INTO p_system_setting VALUES ('rest_clock', '300');
INSERT INTO p_system_setting VALUES ('website_title', '番茄钟');
INSERT INTO p_system_setting VALUES ('website_description', '根据番茄工作法而制作的工具');
INSERT INTO p_system_setting VALUES ('website_url', '');
INSERT INTO p_system_setting VALUES ('website_keywords', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_tags
-- ----------------------------
INSERT INTO p_tags VALUES ('2', 'cat', 'cat', null);
INSERT INTO p_tags VALUES ('3', 'dog', 'dog', null);
INSERT INTO p_tags VALUES ('4', '223', null, null);
INSERT INTO p_tags VALUES ('5', '223', null, null);
INSERT INTO p_tags VALUES ('6', '223', null, null);
INSERT INTO p_tags VALUES ('7', '223', null, null);
INSERT INTO p_tags VALUES ('8', '223', null, null);
INSERT INTO p_tags VALUES ('9', '223', null, null);
INSERT INTO p_tags VALUES ('10', '223', null, null);
INSERT INTO p_tags VALUES ('11', '223', null, null);
INSERT INTO p_tags VALUES ('12', '223', null, null);
INSERT INTO p_tags VALUES ('13', '223', null, null);
INSERT INTO p_tags VALUES ('14', '223', null, null);
INSERT INTO p_tags VALUES ('15', '223', null, null);
INSERT INTO p_tags VALUES ('16', '223', null, null);
INSERT INTO p_tags VALUES ('17', '223', null, null);
INSERT INTO p_tags VALUES ('18', '223', null, null);
INSERT INTO p_tags VALUES ('19', '223', null, null);
INSERT INTO p_tags VALUES ('20', '223', null, null);
INSERT INTO p_tags VALUES ('21', '223', null, null);
INSERT INTO p_tags VALUES ('22', '223', null, null);

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
  `today` int(1) NOT NULL COMMENT '0待办，1今天待办',
  `important` int(1) NOT NULL COMMENT '0不重要，1重要',
  `complete` int(1) NOT NULL COMMENT '完成状态(0未完成，1完成',
  `priority` int(3) NOT NULL COMMENT '0~9优先级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of p_tasks
-- ----------------------------
INSERT INTO p_tasks VALUES ('53', '任务详细功能', '', null, '2013-02-27 15:21:13', '2013-02-27 15:21:13', null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('54', '右面日历页', '', null, '2013-02-27 15:30:01', '2013-02-27 15:30:01', null, '0', '0', '1', '0');
INSERT INTO p_tasks VALUES ('55', '322', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('56', '322', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('57', '322', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('58', '321', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('59', '321', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('60', '233', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('61', '233', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('62', '345', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('63', '345', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');
INSERT INTO p_tasks VALUES ('64', '111', null, '', '0000-00-00 00:00:00', null, null, '0', '0', '0', '0');

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
