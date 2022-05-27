// base64编码转换
// 1.将汉字转成16进制;
// 2.再将16进制分别转成二进制并拼接起来;
// 3.将二进制字符串分割成每份6位, 这就是base64名字来源, 开始补'00', 最后将每份转成的10进制数字跟base64字符匹配拼接返回
export function genBase64(Chinese) {
  // 将字符转成16进制
  const buffer = Buffer.from(Chinese);
  //   console.log(buffer);
  // 将每个16位编码转成二进制
  let twoSystemStr = buffer.reduce((memo, cur) => {
    return (memo += Number(cur).toString(2));
  }, "");
  // 将编码拆分6位一组前面补0的二进制转成10进制
  const tenSystemArr = [];
  while (twoSystemStr.length >= 6) {
    let cur = twoSystemStr.slice(0, 6);
    cur = "00" + cur;
    tenSystemArr.push(parseInt(Number(cur), 2));
    twoSystemStr = twoSystemStr.slice(6);
  }
  //   console.log(tenSystemArr);
  // 拼接64位编码 str
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  str += str.toLowerCase();
  str += "0123456789+/";
  // 将转换成的base64十进制跟编码对应
  const res = tenSystemArr.reduce((memo, cur) => {
    return (memo += str[cur]);
  }, "");
  // console.log(res);
  return res;
}
// 将汉字转成base64

// 将base64转成汉字
// 1. 将base64对应字母找出所在索引下标
// 2. 将下标转成二进制, 不满6位的补0, 最后合并位一个长字符串
// 3. 将长字符串8位截取
// 4. 将每8位为一个字节转成16进制
// 5. 最后将16进制的数组传入 Buffer.from()
// 6. 输出 buffer.toString() 输出汉字
export function decodeBase64(base64) {
  // 找到编码对应的base64下标
  const nums = base64.split("").reduce((memo, cur) => {
    memo.push(findCodeIndex(cur));
    return memo;
  }, []);

  // 将数字分别转成2进制, 并去除头部00, 将所有数字拼接成字符串, 再将字符串转成8位一份的二进制数据
  // console.log(nums);
  let allStr = nums.reduce((memo, cur) => {
    let changeRes = cur.toString(2);
    if (changeRes.length < 6) {
      changeRes = new Array(6 - changeRes.length).fill(0).join("") + changeRes;
    }
    return (memo += changeRes);
  }, "");

  // 截取8位code并转成16进制
  const arr = [];
  while (allStr >= 8) {
    const cur = allStr.slice(0, 8);
    arr.push("0x" + parseInt(cur, 2).toString(16));
    allStr = allStr.slice(8);
  }
  // console.log(arr);

  // 16进制数组转成buffer
  const buffer = Buffer.from(arr).toString();
  return buffer;
}

// 从base64编码中找到index
function findCodeIndex(target) {
  // 拼接64位编码 str
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  str += str.toLowerCase();
  str += "0123456789+/";
  for (let i = 0; i < str.length; i++) {
    const cur = str[i];
    if (str[i] === target) return i;
  }
}
