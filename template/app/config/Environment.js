/**
 * 本类为APP环境 配置类
 * 切换此配置文件, 可自动切换对应环境的 RSA秘钥、MD5签名、服务端URL
 */

/* 环境 测试内网 */
export const ENVIRONMENT_TEST_INTRANET = 'test_intranet';
/* 环境 测试外网 */
export const ENVIRONMENT_TEST_EXTRANET = 'test_extranet';
/* RC环境 内网 */
export const ENVIRONMENT_RC_INTRANET = 'rc_intranet';
/* RC环境 外网 */
export const ENVIRONMENT_RC_EXTRANET = 'rc_extranet';
/* 环境 开发内网 */
export const ENVIRONMENT_DEVELOP = 'develop';
/* 环境 生产 */
export const ENVIRONMENT_RELEASE = 'release';

/******* ******* 当前配置项 ******* *******/
export const ENVIRONMENT = ENVIRONMENT_TEST_INTRANET;

/* 是否 生产 */
export const isRelease = (ENVIRONMENT === ENVIRONMENT_RELEASE);
/* 是否 开发内网 */
export const isDevelop = (ENVIRONMENT === ENVIRONMENT_DEVELOP);
/* 是否 测试内网 */
export const isTestIntranet = (ENVIRONMENT === ENVIRONMENT_TEST_INTRANET);
/* 是否 测试外网 */
export const isTestExtranet = (ENVIRONMENT === ENVIRONMENT_TEST_EXTRANET);