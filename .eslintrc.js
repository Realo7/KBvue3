module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 关闭语句强制分号结尾
    "semi": [0],
    //箭头函数用小括号括起来
    "arrow-parens": 0,
    "trailingComma": false,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
