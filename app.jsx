const porcentaje = 20;

class Model {
      constructor() {
            this.index = 0;
            this.players = 0;
            this.callback = null;
            this.input = null;
      }

      subscribe(render) {
            this.callback = render;
      }

      notify() {
            this.callback();
      }
      totalPuntos() {
            let total = 0;
            for (let i = 0; i < this.players.length; i++) {
                  total = total + this.players[i].score;
            }
            return total;
      }
      totalJugadores() {
            return this.players.length;
      }
      agregarJugador(nombre) {
            console.log(nombre);
            this.players.push({
                  name: nombre.value,
                  score: 0,
                  id: Utils.uuid()
            });
            this.notify();
      }
      modificarScore(e, score, index, x) {
            this.players[index].score = score + x;
            this.notify();
      }
}

const Application = ({ title, model }) => {
      return (<div className="wrapper">
            <header>
                  <h1>RSVP</h1>
                  <p> Registration App </p>
                  <form id="registrar">
                        <input type="text" name="name" placeholder="Invite Someone" />
                        <button type="submit" name="submit" value="submit">Submit</button>
                  </form>
            </header>
            <div className="main">
                  <h2>Invitees</h2>
                  <ul id="invitedList" />
            </div>
      </div>
      );
}


let model = new Model();
let counter = 1;

let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <Application title="Registro de Invitados" model={model} />,
            document.getElementById('container')
      );
};

model.subscribe(render);

render(); 