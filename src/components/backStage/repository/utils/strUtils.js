// some function to handle string format

export function newLineTransform( string ){  // translate \r \n to  <br>

    string = string.replace(/\r\n/g,"<br>")
    string = string.replace(/\n/g,"<br>")
    string = string.replace(/\s/g,"&nbsp")
    return string;
}

export function brTransform( string ){  // translate   <br> to \r \n

  string = string.replace(/<br>/g,'\r\n',)  // 全局替换
  string = string.replace(/<br\/>/g,'\r\n',)  // 全局替换
  string = string.replace(/&nbsp/g,' ')
  return string;
}

// 将string 类型的日期 转换为时间Date类型
export function strToDate( string ) {

  var date = new Date(Date.parse(string.replace(/-/g,"/")))
  return date;
}
