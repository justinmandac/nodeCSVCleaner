//Written by Bien Mandac

//cleans consecutive commas per line

//takes in 2 arguments - input filepath and output filepath
var filename = process.argv[2];
var outputfname = process.argv[3];
var fs = require('fs');
var readline = require('readline');
var rd = readline.createInterface({
	input: fs.createReadStream(filename),
	output: process.stdout,
	terminal: false
});
var cnt = 0; //comma tracking
var arr = ''; //line buffer
var buff = ''; //file buffer

rd.on('line', function(line){
	console.time('TimeElapsed');
	var list = line.toString().split('');
	for (var item in list)
	{	
		var ch = list[item];
	
		if(ch == ','){		
			if(cnt == 0){ //gets the first occurrence of a comma
				arr+=ch;			
			}
			else
			{ //ignores any repetition
				cnt=0;
			}
			cnt++;
		}
		else
		{
			cnt = 0;
			if(ch!='\''){ //ignore apostrophes
				arr+=ch;
			}
		}		
	}
	console.log(arr+'\n'); 
	buff+=(arr+'\n'); //write to file
	arr='';
	cnt=0;
});

rd.on('close', function(){
	
	fs.writeFile(outputfname,buff,function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('File saved at %j .',outputfname);
			console.timeEnd('TimeElapsed');
		}
	});
});