myvar=100

myFunc(){
    echo $myvar
    x=10 y=20
    echo $(($x+$y))
    echo $1 | tr ' ' '\n'
}
myFunc