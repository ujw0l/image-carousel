
class imageCarousel{
    constructor(sel,param1){
   
        const gals  = Array.from(document.querySelectorAll(sel));
        gals.map(x=>{
            console.log(x);
            this.prepCarousel(x ,param1)})
    }

/*
* Prepare carousel 
*
*@param gal Image gallery object
*@param param1 Additional settings for carousel
*
*/
    prepCarousel(gal,param1){

        let maxHeight = gal.offsetHeight;
        let maxWidth = gal.offsetWidth;


        let imgs = Array.from(gal.querySelectorAll('img'));
        imgs.map((x,i)=>{
            x.style.display ='none'
         })
         
        let prevTwoDiv =  document.createElement('div');
             prevTwoDiv.id = `prev-two-div`;
             prevTwoDiv.style = `width:${(0.56)*maxWidth}px;height:${0.8*maxHeight}px;z-index:500;assets/images/display:inline-block;position:absolute;margin-top:${0.1*maxHeight}px;margin-left:0px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;`;
             gal.appendChild( prevTwoDiv);

        let prevOneDiv =  document.createElement('div');
             prevOneDiv.id = `prev-one-div`;
             prevOneDiv.style = `width:${(0.63)*maxWidth}px;height:${0.9*maxHeight}px;z-index:700;assets/images/display:inline-block;position:absolute;margin-top:${0.05*maxHeight}px;margin-left:${0.05*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;`;
             gal.appendChild( prevOneDiv);
         
             let mainDiv =  document.createElement('div');
             mainDiv.id = `car-main-div`;
             mainDiv.style = `width:${0.7*maxWidth}px;height:${maxHeight}px;z-index:1000;assets/images/display:inline-block;position:absolute;margin-top:0px;margin-left:${0.15*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;`;
             gal.appendChild( mainDiv);

        let nextOneDiv =  document.createElement('div');
            nextOneDiv.id = `next-one-div`;
            nextOneDiv.style = `width:${(0.63)*maxWidth}px;height:${0.9*maxHeight}px;z-index:700;assets/images/display:inline-block;position:absolute;margin-top:${0.05*maxHeight}px;margin-left:${0.32*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;`;
            gal.appendChild( nextOneDiv);

        let nextTwoDiv =  document.createElement('div');
            nextTwoDiv.id = `next-two-div`;
            nextTwoDiv.style = `width:${(0.56)*maxWidth}px;height:${0.8*maxHeight}px;z-index:500;assets/images/display:inline-block;position:absolute;margin-top:${0.1*maxHeight}px;margin-left:${0.45*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;`;
            gal.appendChild( nextTwoDiv);

            let carDivsObj = {prevTwo:prevTwoDiv,prevOne:prevOneDiv,mainDiv:mainDiv,nextOne:nextOneDiv,nextTwo:nextTwoDiv}

            this.createCarousel(0,imgs,carDivsObj,param1);

       
            prevTwoDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
            prevOneDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
            nextOneDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
            nextTwoDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
    }
/*
* Create carousel 
*
*@param i Image number
*@param gal Image gallery object
*@param carDivs Carousel divs object
*@param param1 Additional settings for carousel
*
*/
    createCarousel(i,gal,carDivs, param1){


        let prevTwoNum =  0 < i-2 ?  i- 2:gal.length - 2;
        let prevOneNum =  0 < i-1 ?  i- 1:gal.length - 1;
        let nextOneNum =  gal.length-1 <=  i ? 0 : i+1;
        let nextTwoNum =  gal.length-2 <=  i ? 1 : i+2;
       

        console.log(i,nextTwoNum);
        
        carDivs.prevTwo.style.backgroundImage = `url('${gal[prevTwoNum ].src}')`; 
        carDivs.prevOne.style.backgroundImage = `url('${gal[prevOneNum].src}')`; 
        carDivs.mainDiv.style.backgroundImage = `url('${gal[i].src}')`; 
        carDivs.nextOne.style.backgroundImage = `url('${gal[nextOneNum].src}')`; 
        carDivs.nextTwo.style.backgroundImage = `url('${gal[nextTwoNum].src}')`; 


        carDivs.prevTwo.setAttribute('data-num',prevTwoNum)
        carDivs.prevOne.setAttribute('data-num',prevOneNum)  
        carDivs.nextOne.setAttribute('data-num',nextOneNum)
        carDivs.nextTwo.setAttribute('data-num',nextTwoNum) 

    }
}