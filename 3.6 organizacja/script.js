class Stopwatch {
    constructor(display) { // konstruktor ustawia początkowe wartości - czy stoper jest uruchomiony, element DOM gdzie jest wyświetlany, reset oraz wydruk czasu
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.print(this.save);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        this.running = false;
        this.print();
    }
    print() {
        this.display.innerText = this.format(this.times); // ustawia wewnętrzny tekst elementu DOM
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`; // metoda format zwraca szablon który wykorzystuje obiekt times. Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych
    }
    start() { // początkowo sprawdzamy, czy przypadkiem nasz stoper nie jest już uruchomiony (!this.running), następnie jeśli był zatrzymany to trzeba zmienić jego stan na true
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10); // stoper działa w oparciu o interwał, który odpala się co 10 sekund
        }
    }
    step(){
        if (!this.running) return; // metoda sprawdza czy timer jest uruchomiony - jeśli tak uruchamiamy metodę calculate
        this.calculate(); // która przelicza minuty/sekundy/milisekundy
        this.print(); // a następnie ją zwraca
    }
    calculate(){
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds +=1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    stop(){
        this.running = false;
        clearInterval(this.watch);
    }
    save(){
        var node = document.createElement("LI");
        node.innerHTML = `${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`; // działa ale brzydko wygląda - może by to jakoś inaczej?
        document.getElementById("results").appendChild(node);
        var button = document.createElement("button");
        button.innerHTML = "Usuń wpis";
        document.getElementById("results").appendChild(button);
        button.onclick = () => {node.remove(results),button.remove(results);}
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());
