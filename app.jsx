const porcentaje = 20;

class Model {
      constructor() {
            this.index = 0;
            this.invitados = [];
            this.input = null;
            this.callback = null;
      }

      subscribe(render) {
            this.callback = render;
      }

      notify() {
            this.callback();
      }
      registrarInvitado(nombre) {
            console.log(nombre.textContent)
            if ((this.invitados.length > 0) || (this.input.value != "") || (this.input.value != null) ) {
                  if (nombre.value === "") {
                        console.log("sdsd")
                  } else {
                        this.invitados.push({
                              nombre: nombre.value,
                              confirmado: false,
                              clase: '',
                              id: Utils.uuid()
                        });
                        // nombre.value = "";
                        this.notify();
                  }
            }
            console.log(this.invitados)
      }
      removerInvitado(e, index) {
            this.invitados.splice(index, 1);
            this.notify();
      }
      marcarCheckbox(e, index) {
            this.invitados[index].confirmado = (e.target.checked) ? true : false;
            this.invitados[index].clase = (e.target.checked) ? 'responded' : '';
            this.notify();
      }
}
const ListaInvitados = ({ invitados, model }) => {
      let li = '';
      if (invitados.length >= 1) {
            li = invitados.map((item, index) => {
                  return (<li key={index} className={item.clase}>
                        {item.nombre}
                        <label>Confirmed <input type="checkbox" checked={item.confirmado} onClick={e => model.marcarCheckbox(e, index)} /></label>
                        <button onClick={e => model.removerInvitado(e, index)}>remove</button>
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
                  <ListaInvitados invitados={model.invitados} model={model} />
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