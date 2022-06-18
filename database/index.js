class Database {
    constructor(){
        this.last = 0
        this.comics = {}
    }

    saveComic(comic){

        console.log()
        if(comic.num != this.last ){
            let last = true
            if(comic.num > this.last  ) {           
                if(this.comics[this.last ]){
                    this.comics[this.last ].last = false
                } 
                this.last = comic.num                            
            }else{
                last = false
            }
                    
            this.comics[comic.num] = { views:0, ...comic, last }
        }
        console.log(this.last)
        return this.getComic(comic.num)     
    }

    getComic(number){
        console.log({number})
        if(this.comics[number]){
            this.comics[number].views += 1 
        }      
        console.log(this.comics[number])
        return this.comics[number]
    }

    getLast(){
        return this.last
    }

}

const Db = new Database()

module.exports =  Db