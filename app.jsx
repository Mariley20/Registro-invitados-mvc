const porcentaje = 20;

class Model {
      constructor() {
            this.index = 0;
            this.invitados = [];
            this.callback = null;
            this.input = null;
      }

      subscribe(render) {
            this.callback = render;
      }

      notify() {
            this.callback();
      }
      registrarInvitado(nombre) {
            console.log(nombre);
            this.invitados.push({
                  nombre: nombre.value,
                  confirmado: false,
                  id: Utils.uuid()
            });
            console.log(this.invitados)
            this.notify();
      }
}
const ListaInvitados = ({ invitados }) => {
      console.log(invitados.length);
      let li = '';
      if (invitados.length >= 1) {
      li = invitados.map((item, index) => {
            return (<li key={index}>
                  {item.nombre}
                  <label>Confirmed <input type="checkbox" /></label>
                  <button>remove</button>
            </li>
            );
      });    
      }
      return (<ul>{li}</ul>)
}

const Application = ({ title, model }) => {
      return (<div className="wrapper">
            <header>
                  <h1>RSVP</h1>
                  <p> Registration App </p>
                  <form id="registrar" onSubmit={e => {
                        e.preventDefault();
                        model.registrarInvitado(model.input);
                  }}>
                        <input type="text" onChange={e => model.input = e.target} name="name" placeholder="Invite Someone" />
                        <button type="submit" name="submit" value="submit">Submit</button>
                  </form>
            </header>
            <div className="main">
                  <h2>Invitees</h2>
                  <ListaInvitados invitados={model.invitados} />
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