import node from '/node.mjs';
import link from '/link.mjs';
import {karate} from '/csv/karate.mjs';
import {football} from '/csv/football.mjs';
import {dolphin} from '/csv/dolphin.mjs'
import {beautify,findMax,decorateNode} from '/utils.mjs';
import {detectRumourSource} from '/detectRumourSource.mjs';
// var max_links;
let instant;
const nodes=[];
const links=[];
let select='';
let data='';
let nodesCount=5;
// const removeEventListeners=function(){
// 	for(let i=0;i<nodesCount;i++){
// 		nodes[i].svg.removeEventListener('click',makeEndPoints);
// 	}
// }
const makeLinks=function(edges){
	for(let i=0;i<edges.length;i++){
		const l=new link(edges[i],nodes,select);
		// ind++;
		links.push(l);
	}
}
// const makeEndPoints=function(e){
// 	if(e.target.tagName!=='circle')return;
// 	console.log(e.target);
// 	if(ar.length<1){
// 		ar.push(e.target.parentElement);
// 	}
// 	else{
// 		if(links.length==max_links){
// 			removeEventListeners();
// 			return;
// 		}
// 		if(ar[0]!==e.target.parentElement){
// 		ar.push(e.target.parentElement);
// 		makeLink();
// 		ar.pop();
// 		ar.pop();
// 	}
// 	}
// 	// e.stopPropagation();
// }
const startSimulation=function(){
	csv()
	.fromString(data)
	.then((jsonObj)=>{
		
	    jsonObj=beautify(jsonObj);
	    // console.log(jsonObj);
	    nodesCount=findMax(jsonObj);
	    if(select==='dolphin')
	    	nodesCount++;
	    makeGraph();
	    instant=new Date();
	    instant=instant.getTime();
	    console.log(nodesCount,jsonObj.length);
	    makeLinks(jsonObj);
	//     const t=setInterval(()=>{
	//     	if(ind>=jsonObj.length)
	//     		clearInterval(t);
	//     	else{
	//     		// console.log(ind);
	// 	    	makeLink(jsonObj)
	//     	}
	// 	},20000/jsonObj.length);
	// });
	});
}

const makeGraph=function(){
	for(let i=0;i<nodesCount;i++){
		const n=new node(i,nodesCount);
		n.findPosition(i,nodesCount);
		nodes.push(n);
	}
	// max_links=(nodesCount*(nodesCount-1))/2;

	// for(let i=0;i<nodesCount;i++){
	// 	nodes[i].svg.addEventListener('click',makeEndPoints);
	// }
}

const input=document.querySelector('select');
const submit=document.querySelector('#sub');
const detect=document.querySelector('#detect');

submit.addEventListener('click',function(){
	// select=input.value;
	if(input.value==='karate'){
		select='karate';
		data=karate;
	}
	else if(input.value==='dolphin'){
		select='dolphin';
		data=dolphin;
	}
	else if(input.value==='football'){
		select='football';
		data=football;
	}
	startSimulation();
	// makeGraph();
});
detect.addEventListener('click',function(){
	const rumourSource=detectRumourSource(nodes,links);
	decorateNode(links,nodes[rumourSource],instant,select,nodes)
});
const div=document.querySelector('#div')
div.style.position='absolute';
div.style.zIndex='5';

