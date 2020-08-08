
class imageCarousel{
    constructor(sel,param1){
   
        const gals  = Array.from(document.querySelectorAll(sel));
        gals.map((x,i)=>this.prepCarousel(x , i, param1))
    }

/*
* Prepare carousel 
*
*@param gal Image gallery object
*@param galNum gallery number
*@param param1 Additional settings for carousel
*
*/
    prepCarousel(gal,galNum,param1){

      
        let maxWidth = gal.offsetWidth;
        let maxHeight = gal.offsetHeight;
        let carDivsObj = {};


        let imgs = Array.from(gal.querySelectorAll('img'));
        imgs.map((x,i)=>{
            x.style.display ='none'
         })
         
        let prevTwoDiv =  document.createElement('div');
             prevTwoDiv.id = `prev-two-div`;
             prevTwoDiv.style = `width:${(0.56)*maxWidth}px;height:${0.8*maxHeight}px;z-index:500;display:inline-block;position:absolute;margin-top:${0.1*maxHeight}px;margin-left:0px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;`;
             carDivsObj.prevTwo = prevTwoDiv,
             gal.appendChild( prevTwoDiv);

        let prevOneDiv =  document.createElement('div');
             prevOneDiv.id = `prev-one-div`;
             prevOneDiv.style = `width:${(0.63)*maxWidth}px;height:${0.9*maxHeight}px;z-index:700;display:inline-block;position:absolute;margin-top:${0.05*maxHeight}px;margin-left:${0.05*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;`;
             carDivsObj.prevOne = prevOneDiv;
             gal.appendChild( prevOneDiv);
         
        let mainDiv =  document.createElement('div');
             mainDiv.id = `car-main-div`;
             mainDiv.style = `width:${0.7*maxWidth}px;height:${maxHeight}px;z-index:1000;display:inline-block;position:absolute;margin-top:0px;margin-left:${0.15*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;`;
             carDivsObj.mainDiv=mainDiv;
             gal.appendChild( mainDiv);

        let nextOneDiv =  document.createElement('div');
            nextOneDiv.id = `next-one-div`;
            nextOneDiv.style = `width:${(0.63)*maxWidth}px;height:${0.9*maxHeight}px;z-index:700;display:inline-block;position:absolute;margin-top:${0.05*maxHeight}px;margin-left:${0.32*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;`;
            carDivsObj.nextOne = nextOneDiv;
            gal.appendChild( nextOneDiv);

        let nextTwoDiv =  document.createElement('div');
            nextTwoDiv.id = `next-two-div`;
            nextTwoDiv.style = `width:${(0.56)*maxWidth}px;height:${0.8*maxHeight}px;z-index:500;display:inline-block;position:absolute;margin-top:${0.1*maxHeight}px;margin-left:${0.44*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover`;
            carDivsObj.nextTwo=nextTwoDiv;
            gal.appendChild( nextTwoDiv);


            this.createCarousel(0,imgs,carDivsObj,galNum,param1);

        
            prevTwoDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
            prevOneDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
            nextOneDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));
            nextTwoDiv.addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,param1 ));

            window.addEventListener('resize', ()=>this.adjustOnResize(gal, carDivsObj,galNum)) 
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
    createCarousel(i,gal,carDivs, galNum, param1){


        let prevTwoNum ; ;
            if(i == 0){prevTwoNum =  gal.length-2}
            else if(i == 1){prevTwoNum = gal.length-1}
            else{prevTwoNum = i-2}


        let prevOneNum ;
            if(i == 0){prevOneNum =  gal.length-1}
            else{prevOneNum  = i-1} 

        let nextOneNum ;
            if(i == gal.length-1){nextOneNum = 0}
            else{nextOneNum = i+1} 


        let nextTwoNum;
            if(i == gal.length-1){nextTwoNum= 1}
            else if(i == gal.length-2){nextTwoNum= 0}
            else{nextTwoNum = i+2}
       

        carDivs.prevTwo.style.backgroundImage = `url('${gal[prevTwoNum ].src}')`; 
        carDivs.prevTwo.title = undefined != gal[prevTwoNum].title ? gal[prevTwoNum].title:'';
        carDivs.prevTwo.setAttribute('data-num',prevTwoNum)

        carDivs.prevOne.style.backgroundImage = `url('${gal[prevOneNum].src}')`; 
        carDivs.prevOne.title = undefined != gal[prevOneNum].title ? gal[prevOneNum].title:'';
        carDivs.prevOne.setAttribute('data-num',prevOneNum)  

        let mainImg = new Image();
            mainImg.src  = gal[i].src;
            mainImg.title =  undefined != gal[i].title ? gal[i].title:''; 



        let loadingDivCir=   carDivs.mainDiv.querySelector('#img-loading-'+galNum); 

       
         if(null == loadingDivCir){
                    
                loadingDivCir =  document.createElement('div');
                loadingDivCir.id = `img-loading-${galNum}`;
                loadingDivCir.style = `margin-left:${(carDivs.mainDiv.offsetWidth-40)/2}px;margin-top:${(carDivs.mainDiv.offsetHeight-40)/2}px;height:40px;width:40px;border-radius:50%;border-color:rgba(255,255,255,1);border-style: solid; border-width: 3px;z-index:1100; `;
                loadingDivCir.setAttribute('data-wait','left');
                carDivs.mainDiv.appendChild(loadingDivCir);

            var loadingInt = setInterval(()=>{
                switch( loadingDivCir.getAttribute('data-wait')){
                    case 'left': 
                        loadingDivCir.setAttribute('data-wait','top');
                        loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                        loadingDivCir.style.borderTop = '3px solid  rgba(255,255,255,0.8)';
                    break;
                    case 'top':
                            loadingDivCir.setAttribute('data-wait','right');
                            loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                            loadingDivCir.style.borderRight = '3px solid  rgba(255,255,255,0.8)';
                    break;
                    case 'right':
                            loadingDivCir.setAttribute('data-wait','bottom');
                            loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                            loadingDivCir.style.borderBottom = '3px solid  rgba(255,255,255,0.8)';

                    break;
                    case 'bottom':
                            loadingDivCir.setAttribute('data-wait','left');
                            loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                            loadingDivCir.style.borderLeft = '3px solid  rgba(255,255,255,0.8)';
                    break;
                }
                
            }, 400);
        }

        
        mainImg.addEventListener('load',(event)=>{
            clearInterval(loadingInt);
            carDivs.mainDiv.removeChild(loadingDivCir)
            carDivs.mainDiv.style.backgroundImage = `url('${event.target.src}')`;
            carDivs.mainDiv.title = undefined != event.target.title ? event.target.title:'';
         })   
       


        carDivs.nextOne.style.backgroundImage = `url('${gal[nextOneNum].src}')`; 
        carDivs.nextOne.title = undefined != gal[nextOneNum].title ? gal[nextOneNum].title:'';
        carDivs.nextOne.setAttribute('data-num',nextOneNum)

        carDivs.nextTwo.style.backgroundImage = `url('${gal[nextTwoNum].src}')`; 
        carDivs.nextTwo.title =  undefined != gal[nextTwoNum].title ? gal[nextTwoNum].title:'';
        carDivs.nextTwo.setAttribute('data-num',nextTwoNum) 
        
    }


    /*
* Adjust carousel on resize
* @param gal image gallery
*
*/

adjustOnResize(gal, carDivObj,galNum){

    let maxWidth = gal.offsetWidth;
    let maxHeight = gal.offsetHeight;


        let prevTwoDiv =  carDivObj.prevTwo;
            prevTwoDiv.style.width = `${(0.56)*maxWidth}px`;
            prevTwoDiv.style.height = `${0.8*maxHeight}px` ;
            prevTwoDiv.style.marginTop =  `${0.1*maxHeight}px`;
            prevTwoDiv.style.marginLeft =  `0px`;
           
        let prevOneDiv =   carDivObj.prevOne;
            prevOneDiv.style.width = `${(0.63)*maxWidth}px`;
            prevOneDiv.style.height = `${0.9*maxHeight}px` ;
            prevOneDiv.style.marginTop =  `${0.05*maxHeight}px`;
            prevOneDiv.style.marginLeft =  `${0.05*maxWidth}px`;
           
         
        let mainDiv =   carDivObj.mainDiv;
            mainDiv.style.width = `${0.7*maxWidth}px`;
            mainDiv.style.height = `${maxHeight}px`; 
            mainDiv.style.marginTop =  `0px`;
            mainDiv.style.marginLeft =  `${0.15*maxWidth}px`;

         let loadingDiv =   mainDiv.querySelector('#img-loading-'+galNum); 
              if(undefined != loadingDiv){
                loadingDiv.style.marginLeft = `${(mainDiv.offsetWidth-40)/2}px`;
                loadingDiv.style.marginTop = `${(mainDiv.offsetHeight-40)/2}px`;
              }  

       
        let nextOneDiv =   carDivObj.nextOne;
            nextOneDiv.style.width = `${(0.63)*maxWidth}px`;
            nextOneDiv.style.height = `${0.9*maxHeight}px`; 
            nextOneDiv.style.marginTop =  `${0.05*maxHeight}px`;
            nextOneDiv.style.marginLeft =  `${0.32*maxWidth}px`;
         
        let nextTwoDiv =  carDivObj.nextTwo;
            nextTwoDiv.style.width = `${(0.56)*maxWidth}px`;
            nextTwoDiv.style.height = `${0.8*maxHeight}px`; 
            nextTwoDiv.style.marginTop =  `${0.1*maxHeight}px`;
            nextTwoDiv.style.marginLeft =  `${0.44*maxWidth}px`;
          


}

}

