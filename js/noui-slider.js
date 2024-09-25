const imgPreview = document.querySelector(".img-upload__preview>img")
const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value')
slider.style.display = "none"

noUiSlider.create(slider, {
    start: 20,
    connect: [true,false],
    range: {
        'min': 0,
        'max': 100
    },
    format: {
        to: function (value) {
            if (Number.isInteger(value)) {
                return value.toFixed(0);
              }
              return value.toFixed(1);
        },
        from: function (value) {
            return Number(value);
        }
}});

function createEffectSlider (effect){
    const {min,max,step,filter,typeStep} = effect
    slider.style.display = "block"
    slider.noUiSlider.updateOptions({
        start: max,
        connect: true,
        step,
        range: {
            'min': min,
            'max': max
        }
    }
    )
    slider.noUiSlider.on("update",updateSliderHandler)

    function updateSliderHandler(value){
        sliderInput.value = value
        imgPreview.style.filter=`${filter}(${value+typeStep})`
    }
    }


function hiddenSlider(){
    slider.style.display = "none"
    sliderInput.value=""
    imgPreview.style.removeProperty("filter")
    imgPreview.removeAttribute('class')
}
export {createEffectSlider,hiddenSlider}
