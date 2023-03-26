const doPost = e => {
  checkAuthentication(e);
  const userName = e.parameter.text;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('2023.02')
  
  const userCount = getCount(sheet, userName);

  let answer = ''
  
  if (typeof userCount === 'undefined') {
    answer += userName + 'のデータは見つかりませんでした';
  } else {
    answer += userName + 'の' + '2月のランチ手当利用回数は' + userCount + '回です\n';
    if (userCount > 0) {
      answer += '詳細：\n';
      answer += getDetails(sheet, userName)?.join('\n');
    }
  };

  const response = {text: answer};
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

const checkAuthentication = (e) => {
  const verificationToken = PropertiesService.getScriptProperties().getProperty("SLACK_VERIFICATION_TOKEN");

  if (verificationToken != e.parameter.token) {
    throw new Error('Invalid token');
  }
}

const getCount = (sheet, name) => {
  const lastRow = sheet.getRange(5, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  const rows = sheet.getRange(5, 1, lastRow - 4, 2).getValues();
  const row = rows.find(row => row[0] === name);
  return row?.[1];
};


const getDetails = (sheet, name) => {
  const lastRow = sheet.getRange(5, 4).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  const rows = sheet.getRange(5, 4, lastRow - 4, 5).getValues();

  const userRows = rows.filter(row => {
    return (row[1] === name || row[2] === name || row[3] === name || row[4] === name);
  });

  return userRows?.map((userRow, i) => {
    return `  ${i + 1}回目： 申請者 ${userRow[1]}, 2人目 ${userRow[2]}, 3人目 ${userRow[3]}, 4人目 ${userRow[4]}`;
  });
};
