// PROMPTS
date2day = new Date()
current = { 
    year: date2day.getFullYear().toString().slice(2),
    month: (date2day.getMonth()+1).toString().padStart(2,0)
}

if(current.year === '25' && current.month === '07'){ current.month = '08' } 

current.date = current.year + "/" + current.month
current.dateTxt = convDate(current.year, current.month)

function getIndex(prompts, e){
	for (i = 0; i < prompts.length; i++) {
		if ( prompts[i][0] === e ) { return i }
	}
	return -1
}

function convDate(year,month){
  year = 20 + year 
  switch (month) {
    case "01":
        month = "January";
    break;
    case "02":
        month = "Febuary";
    break;
    case "03":
        month = "March";
    break;
    case "04":
        month = "April";
    break;
    case "05":
        month = "May";
    break;
    case "06":
        month = "June";
    break;
    case "07":
        month = "July";
    break;
    case "08":
        month = "August";
    break;
    case "09":
        month = "September";
    break;
    case "10":
        month = "October";
    break;
    case "11":
        month = "November";
    break;
    case "12":
        month = "December";
    break;
  }
  result = month + " " + year
  return result;
}