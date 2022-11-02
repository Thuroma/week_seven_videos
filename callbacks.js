let animals = ['Giraffe', 'Elephant', 'Yak']

animals.forEach( function(animal, index) {
    console.log(animal, index)
})

animals.forEach( (animal, index) => {
    console.log(animal, index)
} )

animals.forEach( (animal, index) => console.log(animal, index))     // only works if there's one line of code in the function like above

animals.forEach(function(animal) {
    console.log(animal)
})

animals.forEach((animal) => console.log(animal))







