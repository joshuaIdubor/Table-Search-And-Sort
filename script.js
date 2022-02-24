var tbArray = [
		{'name': 'Joshua', 'age':'30', 'birthday':'11/10/1989'},	
		{'name': 'Mila', 'age':'32', 'birthday':'10/1/1989'},
		{'name': 'Paul', 'age':'29', 'birthday':'10/14/1990'},
		{'name': 'Dennis', 'age':'25', 'birthday':'11/29/1993'},
		{'name': 'Bukola', 'age':'27', 'birthday':'3/12/1991'},
		{'name': 'David', 'age':'24', 'birthday':'10/31/1995'},
	]


$( document ).ready(function() {

		// var tbArray;
		// $.ajax({
		// 	method:'Get',
		// 	url:'https://reqres.in/api/users',
		// 	success:function(response){
		//	var jsonObj = JSON.parse(response);
		// 		tbArray = jsonObj.data
		// 		buildTable(tbArray);
		// 		//console.log(tbArray)
		// 	}
		// })

		$('th').on('click', function(){

			var column = $(this).data('column');
			var order = $(this).data('order');
			var text =  $(this).html();
			text = text.substring(0, text.length - 1);

			if (order == 'desc') {
				$(this).data('order', 'asc');
				tbArray = tbArray.sort((a,b)=> a[column] > b[column] ? 1 : -1);
				text+= '&#9660';
			}else{
				$(this).data('order', 'desc');
				tbArray = tbArray.sort((a,b)=> a[column] < b[column] ? 1 : -1);
				text+= '&#9650';
			}

			$(this).html(text);
			buildTable(tbArray);
		})

		$('#search-input').on('keyup', function(){
			var value = $(this).val();
			var tbArray2 = searchTable(value, tbArray);
			buildTable(tbArray2);
		})

		getAge(tbArray);

		buildTable(tbArray);
			
})

function searchTable(value, data){
	var filteredData = [];
	for (var i = 0; i < data.length; i++) {
		value = value.toLowerCase();
		var name = data[i].name.toLowerCase();
		var age = data[i].age;
		age = parseFloat(age);
		var birthDate = data[i].birthday;

		if(name.includes(value)){
			filteredData.push(data[i]);
		}
		else if(age == value){
			filteredData.push(data[i]);	
		}
		else if(birthDate.includes(value)){
			filteredData.push(data[i]);	
		}
	}
	return filteredData;
}

function getAge(data2) 
{
	for (var i = 0; i < data2.length;  i++) {
		delete tbArray[i].age;
	    var today = new Date();
	    var birthday = data2[i].birthday;
	    var birthDate = new Date(birthday);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    tbArray[i].age = age;
	}
}
	
function buildTable(data){
	
	var table = document.querySelector('#myTable');
	table.innerHTML = '';

	for (var i = 0; i < data.length;  i++) {
		var row = `<tr> 
						<td>${data[i].name}</td>
						<td>${data[i].age}</td>
						<td>${data[i].birthday}</td>
					</tr>`
		table.innerHTML += row;
	}
}

