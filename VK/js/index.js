$(document).ready(function(){

	var w = $('body').width();
	$('body').height(w);

	CalendarGenerator("calendar",
		new Date().getFullYear(), 
		new Date().getMonth());

	Calendar("calendar",
		new Date().getFullYear(), 
		new Date().getMonth());

	// переключатель минус месяц
	$('#calendar thead tr:nth-child(1) td:nth-child(1)').click(function(){
		Calendar("calendar", 
			document.querySelector('#calendar thead td:nth-child(2)').dataset.year, 
			parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
	});
	// переключатель плюс месяц
	$('#calendar thead tr:nth-child(1) td:nth-child(3)').click(function() {
	  	Calendar("calendar", 
	  		document.querySelector('#calendar thead td:nth-child(2)').dataset.year, 
	  		parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
	});
})

function CalendarGenerator(id, year, month) {
	var D = new Date(),
		Dlast = new Date(year,month+1,0).getDate(),
	    DD = new Date(year,month,Dlast),
	    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
	    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
	    day = 0,
	    month=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
		week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
		calendar = "";

	calendar += "<tr class='day'><td>"+D.getDay()+" "+month[D.getMonth()]+" ("+week[D.getDay()]+")</td></tr>";

	$("#"+id+" tbody").html(calendar);
}


function Calendar(id, year, month) {






	var Dlast = new Date(year,month+1,0).getDate(),
	    D = new Date(year,month,Dlast),
	    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
	    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
	    calendar = '<tr>',
	    month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
	if (DNfirst != 0)
  		for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
	else
  		for(var  i = 0; i < 6; i++) calendar += '<td>';

	for(var  i = 1; i <= Dlast; i++) {
  		if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) 
    		calendar += '<td class="today">' + i;
	  	else
	    	calendar += '<td>' + i;
	  	if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) 
	    	calendar += '<tr>';
	}
	for(var  i = DNlast; i < 7; i++) 
		calendar += '<td>&nbsp;';
	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
	    document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
}

