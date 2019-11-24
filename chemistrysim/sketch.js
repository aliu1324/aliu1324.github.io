	var VE = {
	1: ['H'],
	2: [''],
	3: ['B', 'Al', 'Ga', 'In', 'Tl'],
	4: ['C', 'Si', 'Ge', 'Sn', 'Pb'],
	5: ['N', 'P', 'As', 'Sb', 'Bi'],
	6: ['O', 'S', 'Se', 'Te', 'Po'],
	7: ['F', 'Cl', 'Br', 'I', 'At'],
	8: ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn']
};

	TVE = ''; //Total valence electrons
	CN = ''; //Coordination number
	LP = ''; //Lone pairs
	SN = ''; //Steric number
	EDG = ''; //Electron domain geometry
	MG = ''; 
	BA = '';
	

 
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  
  H = loadImage('https://aliu1324.github.io/chemistrysim/img/H.png');
  B = loadImage('https://aliu1324.github.io/chemistrysim/img/B.png');
  C = loadImage('https://aliu1324.github.io/chemistrysim/img/C.png');
  Si = loadImage('https://aliu1324.github.io/chemistrysim/img/Si.png');
  N = loadImage('https://aliu1324.github.io/chemistrysim/img/N.png');
  P = loadImage('https://aliu1324.github.io/chemistrysim/img/P.png');
  O = loadImage('https://aliu1324.github.io/chemistrysim/img/O.png');
  S = loadImage('https://aliu1324.github.io/chemistrysim/img/S.png');
  Se = loadImage('https://aliu1324.github.io/chemistrysim/img/Se.png');
  F = loadImage('https://aliu1324.github.io/chemistrysim/img/F.png');
  Cl = loadImage('https://aliu1324.github.io/chemistrysim/img/Cl.png');
  Br = loadImage('https://aliu1324.github.io/chemistrysim/img/Br.png');
  I = loadImage('https://aliu1324.github.io/chemistrysim/img/I.png');
  He = loadImage('https://aliu1324.github.io/chemistrysim/img/He.png');
  Ne = loadImage('https://aliu1324.github.io/chemistrysim/img/Ne.png');
  Ar = loadImage('https://aliu1324.github.io/chemistrysim/img/Ar.png');
  Kr = loadImage('https://aliu1324.github.io/chemistrysim/img/Kr.png');
  Xe = loadImage('https://aliu1324.github.io/chemistrysim/img/Xe.png');
  Rn = loadImage('https://aliu1324.github.io/chemistrysim/img/Rn.png');
  Ge = loadImage('https://aliu1324.github.io/chemistrysim/img/Ge.png');
  As = loadImage('https://aliu1324.github.io/chemistrysim/img/As.png');
  Sb = loadImage('https://aliu1324.github.io/chemistrysim/img/Sb.png');
  Te = loadImage('https://aliu1324.github.io/chemistrysim/img/Te.png');
  At = loadImage('https://aliu1324.github.io/chemistrysim/img/At.png');
  Al = loadImage('https://aliu1324.github.io/chemistrysim/img/Al.png');
  Ga = loadImage('https://aliu1324.github.io/chemistrysim/img/Ga.png');
  In = loadImage('https://aliu1324.github.io/chemistrysim/img/In.png');
  Tl = loadImage('https://aliu1324.github.io/chemistrysim/img/Tl.png');
  Sn = loadImage('https://aliu1324.github.io/chemistrysim/img/Sn.png');
  Pb = loadImage('https://aliu1324.github.io/chemistrysim/img/Pb.png');
  Bi = loadImage('https://aliu1324.github.io/chemistrysim/img/Bi.png');
  Po = loadImage('https://aliu1324.github.io/chemistrysim/img/Po.png');
  

	createP('Type in a valid molecule and hit enter: ');
	inp = createInput('');
	
	coordination_number_statement = createP('Coordination number: ' + CN);
	lone_pairs_statement = createP('Lone pairs: ' + LP);
	steric_number_statement = createP('Steric number: ' + SN);
	EDG_statement = createP('Electron domain geometry: ' + EDG);
	MG_statement = createP('Molecular geometry: ' + MG);
	bond_angle_statement = createP('Bond angle (°): ' + BA);
	
	
	
	
	inp.changed(updateGraphic);
	
}


function updateGraphic(){
	TVE = 0 //Total valence electrons
	CN = 0 //Coordination number
	charge = 0 //Net molecular charge
	
	molecule_input = inp.value();
	
	if (molecule_input.includes(' ')){
	splitcharge = molecule_input.split(' ');
	charge = eval(splitcharge[1]);
	molecule = splitcharge[0];
	constituents = molecule.split(/(\d+)/);
	}
	else{
		constituents = molecule_input.split(/(\d+)/);
	}
		
	if(constituents[constituents.length - 1] == '')
	{
		constituents.pop();
	}	
	
	if(isNaN(constituents[constituents.length-1]))
	{
		constituents.push('1');
	}

		
		for(let i = 1; i < 9; i++)
		{
			for(let j = 0; j < constituents.length; j++)
			{
				if(VE[i].includes(constituents[j]))
				{
					TVE = TVE + i*constituents[j+1];
				}
			}
		}
		
		TVE = TVE - charge;
		

	
	//Calculate CN
	for(let k = 0; k < constituents.length; k++)
	{
		if(isNaN(constituents[k]) == false)
		{
			CN = CN + parseInt(constituents[k]);
		}
	}
	CN = CN - 1
	
	if(constituents.includes('H'))
	{
		LP = (TVE-2*CN)/2
	}
	else
	{
		LP = (TVE - 8*CN)/2
	}
	
	SN = CN + LP
	if (SN ==1)
	{
		EDG = 'Linear';
		MG = 'Linear';
		BA = '180';
	}
	else if(SN == 2)
	{
		EDG = 'Linear';
		MG = 'Linear';
		BA = '180';
		
	}
	else if(SN == 3)
	{
		EDG = 'Trigonal planar';
		BA = '120';
		if(CN == 3 && LP ==0)
		{
			MG = 'Trigonal planar';
		}
		else if(CN == 2 && LP == 1)
		{
			MG = 'Bent';
		}
		else if(CN == 1 && LP == 2)
		{
			MG = 'Linear';
		}
	}
	else if(SN == 4)
	{
		
		EDG = 'Tetrahedral';
		BA = '109.5'
		if (CN == 4 && LP == 0)
		{
			MG = 'Tetrahedral';
		}
		else if (CN == 3 && LP == 1)
		{
			MG = 'Trigonal pyramidal';
		}
		else if (CN == 2 && LP == 2)
		{
			MG = 'Bent';
		}
		else if (CN == 1 && LP == 3)
		{
			MG = 'Linear';
			BA = '180';
		}
		
	}
	else if(SN == 5)
	{
		EDG = 'Trigonal bipyramidal';
		
		if (CN == 5 && LP == 0)
		{
			MG = 'Trigonal bipyramidal';
			BA = '90, 120, 180';
		}
		else if (CN == 4 && LP == 1)
		{
			MG = 'Seesaw';
			BA = '90, 120, 180';
		}
		else if (CN == 3 && LP == 2)
		{
			MG = 'T-shaped';
			BA = '90, 180';
		}
		else if (CN == 2 && LP == 3)
		{
			MG = 'Linear';
			BA = '180';
		}
		else if (CN == 1 && LP == 4)
		{
			MG = 'Linear';
			BA = '180';
		}
	}
	else if(SN == 6)
	{
		EDG = 'Octahedron';
		
		if (CN == 6 && LP == 0)
		{
			MG = 'Octahedron';
			BA = '90, 180';
		}
		else if (CN == 5 && LP == 1)
		{
			MG = 'Square pyramidal';
			BA = '90, 180';
		}
		else if (CN == 4 && LP == 2)
		{
			MG = 'Square planar';
			BA = '90, 180';
		}
		else if (CN == 2 && LP == 4)
		{
			MG = 'Linear';
			BA = '180';
		}
		else if (CN == 1 && LP == 5)
		{
			MG = 'Linear';
			BA = '180';
		}
		
	}

	coordination_number_statement.html('Coordination number: ' + CN);
	lone_pairs_statement.html('Lone pairs: ' + LP);
	steric_number_statement.html('Steric number: ' + SN);
	EDG_statement.html('Electron domain geometry: ' + EDG);
	MG_statement.html('Molecular geometry: ' + MG);
	bond_angle_statement.html('Bond angle (°): ' + BA);
	
}


function draw() {

background(0);
lights();
rotateY(frameCount/150);
if (CN == 1 && MG == "Linear") //All diatomic molecules.
{
	el1 = constituents[0];
	
	if (constituents[1] == 2)
	{
		el2 = el1;
	}
	else{
	el2 = constituents[2];
	
	}
	
    translate(-100,0,0);
    push();
    texture(eval(el1));
    noStroke();
    rotateX(3.1415926);
    sphere(35);
    pop();
	  
    translate(200, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el2));
    sphere(35);
    pop();
	  
	  
    translate(-100,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	orbitControl();

}

if (MG == "Trigonal planar"){
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	  
    translate(70,100,0);
	push();
	fill(211,211,211);
	rotateZ(-3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(-140,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(70,-130,0);
	push();
	fill(211,211,211);
	rotateZ(0);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,75,0);
	push();
	texture(eval(el1));
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	sphere(35);
	pop();
	
	translate(0,-150,0);
	push();
	texture(eval(el2));
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	sphere(35);
	pop();
	
	translate(150,250,0);
	push();
	texture(eval(el3));
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	sphere(35);
	pop();
	
	translate(-300,0,0);
	push();
	texture(eval(el4));
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	sphere(35);
	pop();

orbitControl();
}
else if(MG == "Bent")
{
	
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	
	translate(70,100,0);
	push();
	fill(211,211,211);
	rotateZ(-3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(-140,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(70,-130,0);
	translate(0,75,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	texture(eval(el1));
	noStroke();
	sphere(35);
	pop();
	
	translate(0,-150,0);
	translate(150,250,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	texture(eval(el2));
	noStroke();
	sphere(35);
	pop();
	
	translate(-300,0,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	texture(eval(el3));
	noStroke();
	sphere(35);
	pop();

	orbitControl();
}

if (MG == "Octahedron"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	el5 = els[4];
	el6 = els[5];
	el7 = els[6];

    translate(-100,100,0);
    push();
    noStroke();
    rotateX(3.1415926);
	texture(eval(el2));
    sphere(35);
    pop();
	  
    translate(200, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926/4);
	texture(eval(el1));
    sphere(35);
    pop();
	  
    translate(-100,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(200,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(100, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el3));
    sphere(35);
    pop();
	
	translate(-200,100,0);
	push();
	fill(211,211,211);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,-200,0);
	push();
	fill(211,211,211);
	noStroke();
	cylinder(10, 150);
	pop();

    translate(0, -100, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el4));
    sphere(35);
    pop();

    translate(0, 400, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el5));
    sphere(35);
    pop();
	
	translate(0,-200,100);
	push();
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,-200);
	push();
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0, 0, -100);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el6));
    sphere(35);
    pop();
		
	translate(0, 0, 400);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el7));
    sphere(35);
    pop();
	orbitControl();
}

if (MG == "Square pyramidal"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	el5 = els[4];
	el6 = els[5];


    translate(-100,100,0);
    push();
    noStroke();
    rotateX(3.1415926);
	texture(eval(el2));
    sphere(35);
    pop();
	  
    translate(200, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926/4);
	texture(eval(el1));
    sphere(35);
    pop();
	  
    translate(-100,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(200,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(100, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el3));
    sphere(35);
    pop();
	
	translate(-200,100,0);	
	translate(0,-200,0);
	push();
	fill(211,211,211);
	noStroke();
	cylinder(10, 150);
	pop();

    translate(0, -100, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el4));
    sphere(35);
    pop();

    translate(0, 400, 0);
	
	translate(0,-200,100);
	push();
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,-200);
	push();
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0, 0, -100);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el5));
    sphere(35);
    pop();
		
	translate(0, 0, 400);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el6));
    sphere(35);
    pop();
	orbitControl();
}


if (MG == "Square planar"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	el5 = els[4];

    translate(-100,100,0);
    push();
    noStroke();
    rotateX(3.1415926);
	texture(eval(el2));
    sphere(35);
    pop();
	  
    translate(200, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926/4);//Central
	texture(eval(el1));
    sphere(35);
    pop();
	  
    translate(-100,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(200,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(100, 0, 0);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el3));
    sphere(35);
    pop();
	
	translate(-200,100,0);	
	translate(0,-200,0);
    translate(0, -100, 0);
    translate(0, 400, 0);
	
	translate(0,-200,100);
	push();
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,-200);
	push();
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0, 0, -100);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el4));
    sphere(35);
    pop();
		
	translate(0, 0, 400);
    push();
    noStroke();
    rotateY(3.1415926);
	texture(eval(el5));
    sphere(35);
    pop();
	orbitControl();
}

if (MG == "Trigonal bipyramidal"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	el5 = els[4];
	el6 = els[5];
	
	translate(70,100,0);
	push();
	fill(211,211,211);
	rotateZ(-3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(-140,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(70,-130,0);
	push();
	fill(211,211,211);
	rotateZ(0);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,75,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	texture(eval(el1));
	noStroke();
	sphere(35);
	pop();
	
	translate(0,-150,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el2));
	sphere(35);
	pop();
	
	translate(150,250,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el3));
	sphere(35);
	pop();
	
	translate(-300,0,0);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el4));
	sphere(35);
	pop();
	
	translate(150,-100,100);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(0,0,-200);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,250);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el5));
	sphere(35);
	pop();
	
	translate(0,0,-300);
	push();
	rotateX(3.1415926535);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el6));
	sphere(35);
	pop();
	orbitControl();
}

if (MG == "Seesaw"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	el5 = els[4];
	
	translate(70,100,0);
	push();
	fill(211,211,211);
	rotateZ(-3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(-140,0,0);
	push();
	fill(211,211,211);
	rotateZ(3.1415926535/3);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(70,-130,0);
	translate(0,75,0);
	push();
	rotateY(3.1415926535/2);
	texture(eval(el1));
	noStroke();
	sphere(35);
	pop();
	
	translate(0,-150,0);

	translate(150,250,0);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el2));
	sphere(35);
	pop();
	
	translate(-300,0,0);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el3));
	sphere(35);
	pop();
	
	translate(150,-100,100);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(0,0,-200);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,250);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el4));
	sphere(35);
	pop();
	
	translate(0,0,-300);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el5));
	sphere(35);
	pop();
	orbitControl();
}


if (MG == "T-shaped"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	
	translate(70,100,0);	
	translate(-140,0,0);	
	translate(70,-130,0);
	translate(0,75,0);
	push();
	rotateY(3.1415926535/2);
	texture(eval(el1));
	noStroke();
	sphere(35);
	pop();
	
	translate(0,-150,0);
	translate(150,250,0);
	translate(-300,0,0);	
	translate(150,-100,100);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(0,0,-200);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,250);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el2));
	sphere(35);
	pop();
	
	translate(0,0,-300);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el3));
	sphere(35);
	pop();
	
	translate(0,100,150);
	push();
	fill(211,211,211);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,100,0);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el4));
	sphere(35);
	pop();
	
	orbitControl();
}

if (MG == "Linear" && CN == 2){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	
	translate(70,100,0);	
	translate(-140,0,0);	
	translate(70,-130,0);
	translate(0,75,0);
	push();
	rotateY(3.1415926535/2);
	texture(eval(el1));
	noStroke();
	sphere(35);
	pop();
	
	translate(0,-150,0);
	translate(150,250,0);
	translate(-300,0,0);	
	translate(150,-100,100);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	
	translate(0,0,-200);
	push();
	fill(211,211,211);
	rotateX(3.1415926535/2);
	noStroke();
	cylinder(10, 150);
	pop();
	
	translate(0,0,250);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el2));
	sphere(35);
	pop();
	
	translate(0,0,-300);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el3));
	sphere(35);
	pop();
	

	orbitControl();
}

if (MG == "Tetrahedral"){
	
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	el5 = els[4];
	
	push();
	fill(211,211,211);
	noStroke();
	cylinder(10, 150);
	pop();

	translate(-75,150,0);
	push();
	fill(211,211,211);
	noStroke();
	rotateZ(54.75*3.1415926535/180);
	cylinder(10, 150);
	pop();
	
	translate(75,-50,0);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el1));
	sphere(35);
	pop();
	
	translate(50,30,-75);
	push();
	fill(211,211,211);
	noStroke();
	rotateZ(-54.75*3.1415926535/180);
	rotateX(120*3.1415926535/180);
	cylinder(10, 150);
	pop();
	
	translate(0,0,150);
	push();
	fill(211,211,211);
	noStroke();
	rotateZ(-240*3.1415926535/180);
	rotateX(-54.75*3.1415926535/180);
	cylinder(10, 150);
	pop();
	
	translate(50,25,50);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el2));
	sphere(35);
	pop();
	
		
	translate(-100,-200,-125);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el3));
	sphere(35);
	pop();
	
	translate(-150,250,10);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el4));
	sphere(35);
	pop();
	
	translate(225,-40,-150);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el5));
	sphere(35);
	pop();
	orbitControl();
	
}

if (MG == "Trigonal pyramidal"){
	els = [];
	
	for (let i = 1; i < constituents.length; i+=2){
		for (let j = 0; j < constituents[i]; j++)
		{
			els.push(constituents[i-1]);
		}
	}
	el1 = els[0];
	el2 = els[1];
	el3 = els[2];
	el4 = els[3];
	
	translate(-75,150,0);
	push();
	fill(211,211,211);
	noStroke();
	rotateZ(54.75*3.1415926535/180);
	cylinder(10, 150);
	pop();
	
	translate(75,-50,0);
	push();
	rotateY(3.1415926535/2);
	noStroke();
	texture(eval(el1));
	sphere(35);
	pop();
	
	translate(50,30,-75);
	push();
	fill(211,211,211);
	noStroke();
	rotateZ(-54.75*3.1415926535/180);
	rotateX(120*3.1415926535/180);
	cylinder(10, 150);
	pop();
	
	translate(0,0,150);
	push();
	fill(211,211,211);
	noStroke();
	rotateZ(-240*3.1415926535/180);
	rotateX(-54.75*3.1415926535/180);
	cylinder(10, 150);
	pop();
	
	translate(50,25,50);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el2));
	sphere(35);
	pop();
	
		
	translate(-100,-200,-125);	
	translate(-150,250,10);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el3));
	sphere(35);
	pop();
	
	translate(225,-40,-150);
	push();
	rotateY(3.1415926535/2);
	rotateZ(3.1415926535);
	noStroke();
	texture(eval(el4));
	sphere(35);
	pop();
	orbitControl();
}
}