let ENVIRONMENT = 'ONLINE' // TEST SANDBOX ONLINE
let obj = {
    /** 服务器相关 */
    // API_HOST: 'http://192.168.47.8:8083/dtorderdev', // 李东
    // API_HOST: 'http://192.168.47.2:8099/dev', // 永旺
    // API_HOST: 'http://192.168.76.33:8080/dtdevoptweb', // 旭哥
    API_HOST: ENVIRONMENT == 'ONLINE' ? 'http://h-back.izbj.top' : 
    (ENVIRONMENT == 'SANDBOX' ? 'https://dhfinet.dhgate.com/dtorder' : 'https://dhfinet.dhgate.com/creditloanwebtest/dtdevoptweb'),
    DT_HOST: ENVIRONMENT == 'ONLINE' ? 'https://dhfinet.dhgate.com/digitaltrade' : 
                (ENVIRONMENT == 'SANDBOX' ? 'https://dhfinet.dhgate.com/dtorder' : 'https://dhfinet.dhgate.com/creditloanwebtest/dtorder'),
    API_PATH: 'camelfinweb or camelportal',
    IMG_HOST: 'http://image.dhgate.com/',
    /** 是否测试模式 */
    TEST_FLAG: false,
    /** 存储相关 */
    STORAGE_SESSION_ID: 'toekn',
    STORAGE_TOKEN: ENVIRONMENT == 'ONLINE' ? 'token' :
        (ENVIRONMENT == 'SANDBOX' ? 'token' : 'token'),
    STORAGE_NAME: 'name',
    TOKEN_NAME: 'token',
    STORAGE_TOKEN_ENCRYPT: 'dttokenencrypt',
    STORAGE_USER: 'user',
    /** 错误提示 */
    ERROR_MSG_COMMON: '系统异常',
    // 认证状态
    AUTHING: 0,
    AUTH_SUCCESS: 1,
    AUTH_FAIL: 2,
    AUTH_NULL: 3,
    AUTH_STATUS: {
        '-1': '未认证',
        '0': '认证中',
        '1': '认证通过',
        '2': '认证拒绝',
        '3': '认证中'
    },
    /** 设备类型 */
    IOS: 1, // IOS
    ANDROID: 2, // ANDROID

    /** 卡Bin状态 */
    CARDBIN_START: '1',
    CARDBIN_STOP: '2',

    /** 账户类型 */
    ACCOUNT_TYPE_PERSON: 'Person',
    ACCOUNT_TYPE_COMPANY: 'Enterprise',

    /** 店铺申核状态 */
    SHOP_AUTHING: 0,
    SHOP_AUTH_SUCCESS: 1,
    SHOP_AUTH_FAIL: 2,
    SHOP_TOKEN_NULL: 3,

    /** 用户审核状态 */
    USER_AUTHING: 0,
    USER_AUTH_SUCCESS: 1,
    USER_AUTH_FAIL: 2,
    USER_AUTH_NONE: 3,

    /** 返回类型 */
    HTTP_SUCCESS: '1',
    HTTP_FAIL: '0',
    HTTP_TOKEN_FAIL: '202',
    HTTP_TOKEN_FAIL_PROXY:'2021',

    /** 错误码 */
    HTTP_CODE_RATE_CHANGE: 'A005',

    /** 行为验证码ID */
    CAPTCHAID: '4c587cb4b4184caf9605665886d45fd5',

    /** 无需要登录即可跳转的页面 */
    NOT_LOGIN_PAGES: [
        'register-proto',
        'privacy-policy',
    ],

    resourceDict: {
    },

    menuMap: {
        '1-1': {
            show: false,
            write: false,
            url: 'user',
        },
        '1-2': {
            show: false,
            write: false,
            url: 'role',
        },
        '1-3': {
            show: false,
            write: false,
            url: 'limit',
        },
        '2': {
            show: false,
            write: false,
            url: 'version',
        },
        '3': {
            show: false,
            write: false,
        },
        '4': {
            show: false,
            write: false,
        },
        '5-1': {
            show: false,
            write: false,
        },
        '5-2': {
            show: false,
            write: false,
        },
        '6': {
            show: false,
            write: false,
        },
        '7': {
            show: false,
            write: false,
        }
    },
    menuRelation: {
        '1-1': '系统管理',
        '1-2': '系统管理',
        '1-3': '系统管理',
        '5-1': '渣打异常冲账',
        '5-2': '渣打异常冲账'
    },
    resourceMap: {
        // 用户部分
        '/user/addUser': {
            show: false,
        },
        '/user/deleteUser': {
            show: false,
        },
        '/user/editUser': {
            show: false
        },
        '/relation/addRoleRelationForUser': {
            show: false
        },
        // 角色部分
        '/role/addRole': {
            show: false
        },
        '/role/deleteRole': {
            show: false
        },
        '/role/editRole': {
            show: false
        },
        '/relation/addResRelationForRole': {
            show: false
        },
        // 权限部分
        '/resource/addResource': {
            show: false
        },
        '/resource/deleteResource': {
            show: false
        },
        '/resource/editResource': {
            show: false
        },
        // 版本部分
        '/version/add.do': {
            show: false
        },
        '/version/delete.do': {
            show: false
        },
        '/version/update.do': {
            show: false
        },
        // 热修复部分
        '/hotupdate/add.do': {
            show: false
        },
        '/hotupdate/delete.do': {
            show: false
        },
        '/hotupdate/update.do': {
            show: false
        },
        // 数据修复
        '/sqlFile/upload.do': {
            show: false
        },
        // 卡bin部分
        '/cardbin/add.do': {
            show: false
        },
        '/cardbin/delete.do': {
            show: false
        },
        '/cardbin/update.do': {
            show: false
        },
        // 国际化部分
        '/message/saveMessages': {
            show: false
        },
        '/message/deleteMessage': {
            show: false
        },
        '/message/updateMessages': {
            show: false
        },
        '/message/messageDown': {
            show: false
        },
        // 充值部分
        '/useraccount/rechargePay': {
            show: false
        },
        '/useraccount/correctRecharge': {
            show: false
        }
    },
}

obj.SHOP_STATUS_MAP = {
    0: '审核中',
    1: '审核通过',
    2: '审核失败',
    3: '待完善'
}

obj.USER_STATUS_MAP = {
    0: '审核中',
    1: '审核通过',
    2: '审核失败',
    3: '未审核',
}

obj.TIXIAN_STATUS_MAP = {
    '00': '初始化',
    '01': '已申请',
    '02': '审核通过',
    '03': '审核拒绝',
    '04': '放款中',
    '06': '放款成功',
    '08': '放款失败',
    '09': '关闭',
}

obj.BANK_MAP = {
    '北京农村商业银行': 'beijingnongcunshangyeyinhang',
    '渤海银行': 'bohaiyinhang',
    '发现金融服务公司': 'faxianjinrongfuwugongsi',
    '富滇银行': 'fudianyinhang',
    '工商银行': 'gongshangyinhang',
    '广发银行': 'guangfayinhang',
    '哈尔滨银行': 'haerbinyinhang',
    '华夏银行': 'huaxiayinhang',
    '汇付天下': 'huifutianxia',
    '江苏银行': 'jiangsuyinhang',
    '宁波银行': 'jiangsuyinhang',
    '宁波银行': 'ningboyinhang',
    '平安银行': 'pinganyinhang',
    '三明农商行': 'sanmingnongshanghang',
    '上海农村商业银行': 'shanghainongcunshangyeyinhang',
    '深圳发展银行': 'shenzhenfazhanyinhang',
    '台州银行': 'taizhouyinhang',
    '招商银行': 'zhaoshangyinhang',
    '浙江银行': 'zhejiangyinhang',
    '中国光大银行': 'zhongguoguangdayinhang',
    '中国民生银行': 'zhongguominshengyinhang',
    '中国银行': 'zhongguoyinhang',
    '中国银联': 'zhongguoyinlian',
    '中国邮政储蓄银行': 'zhongguoyouzhengchuxuyinhang',
}

export default obj