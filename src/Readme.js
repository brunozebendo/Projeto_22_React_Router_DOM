/** esse é o segundo código da seção 21, ele cria um site com várias páginas 
 * justamente para aprender a criá-las e a primeira parte é replicar o que foi
 * ensinado no código anterior*/
/**A segunda parte vai ser comunicar com o backend para ensinar outros conceitos
 * do React Router Dom, o primeiro deles o loader que permite que determinada
 * página faça um fetch e lide com os dados. Esse loader é carregado quando se visita 
 * a página e na aula 344 é explicado que ele aguarda a informação ser atingida
 * no backend, por isso não é preciso controle de estado. No entanto, caso
 * se queira mostrar alguma mensagem enquanto carrega a página, é preciso usar
 * a função useNavigation (aula 345) que faz justamente esse controle e mostra
 * um isLoading, por exemplo, enquanto os dados não vem, ele tem que ser
 * usado em alguma página que vá carregar os dados antes de ir para outra e a sintaxe
 * está na aula, mas depois foi comentada pois será mostrada outra solução.
 * No App está assim, por enquanto. Depois esse código foi transferido para o Events.
 */

{index: true, element: <EventsPage />, loader: async () => {
    const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
   //será feito
  } else {
    const resData = await response.json();
    return resData.events;
   }

/**já no componente Events, onde é criada a função acima utilizada, é preciso
 * importar o useLoaderData para lidar com os dados trazidos do backend
 * The useLoaderData hook is part of React Router v6, specifically from
 * the react-router-dom package.
 * It allows you to access data returned from your route loader function.
 * Na aula 342 é mostrado que esse acesso tem que ser dado em um componente de mesmo
 * nível que estão no mesmo children, por exemplo, pois se for em um componente
 * de mais alto nível, não funcionará
 */

import EventsList from '../components/EventsList';
import {useLoaderData} from 'react-router-dom';

function EventsPage() {
  const events = useLoaderData();
 return (
    <>
     <EventsList events={events} />
    </>
  );
}
export default EventsPage;

/**Na aula 343 o código de carregamento é retirado do App e utilizado em uma
 * function no componente Events, então é importado no App, dado um alias
 * e usado dessa forma abaixo. A ideia é manter o código de tratamento dos dados
 * do fetch no componente que o utilizará.
 */
{index: true, element: <EventsPage />, loader: eventsLoader,},

/**na aula 346 é explicado que o loader do React Router Dom pode retornar
 * qualquer coisa, inclusive um response que é uma função interna do browser,
 * com base nessa premisa, dentro do componente Events.js, o que antes
 * era retornado assim
 * const resData = await response.json();
    return resData.events;
    teve essa lógica transferida para o começo do componente, conforme abaixo,
    e no return que fica dentro da função loader, ficou apenas
    return response, pois, pelo que entendi, os dados estarão aí dentro
 */

function EventsPage() {
    const data = useLoaderData();
    const events = data.events;

/**Na 347 é explicado que dentro de uma loader function pode ser usada qualquer
 * função JS nativa, como colheta de cookies ou qualquer coisa assim, mas não
 * podem ser usadas funções puras do React, como os states, pois não é uma função
 * do React e sim uma .js
 */

/**Na aula 348 é explicado como lidar com erros, é feito um código padrão no componente
 * events, mas depois comentado pois é usado o modo padrão que é criar um componente
 * Error.js, contendo a mensagem que se quer passar e depois no App.js incluir o código
 * abaixo que dará acesso à todas as páginas e será mostrado se der erro em qualquer
 * caminho. Reparar que ele é criado antes do children
 */

const router = createBrowserRouter([
    {path: '/',
      element: <RootLayout />,
      errorElement:<ErrorPage />,

      /**Na aula 349 o elemento Error é aprimorado, primeiro é criado um elemento
       * pageContent para envelopar o Error, ou seja, criar um padrão de como será
       * mostrado o erro. Depois, a página de Error.js é modificada para abranger
       * e mostrar dinamicamente diferentes mensagens a depender do tipo de erro do status. Então, por exemplo
       * no Event.js foi setado o seguinte código.
       */
      throw new Response (JSON.stringify({message:'Could not fetch events.'}), {
        status: 500,
        /**Assim, na página Error, será usado esse status e mensagem ou outra lá
         * estabelecida, para isso foi usada a funcionalidade useRouteError
        */

import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';

function ErrorPage() {
    const error = useRouteError();
    let title = "An error occurred";
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = JSON.parse(error.data).message;
    }
    if (error.status === 404) {
        title = 'Not found!'
        message = 'Could not find resource or page'

    }
    return <PageContent>
        <p>{message}</p> 
        </PageContent>
}

export default ErrorPage;

/**Na aula 350 é incluído o método abaixo para tratar o erro, digitando menos
 * código do que se usa-se o Response (comentado para comparação no Events.js).
 * O json é um méto React Router Dom e já traz o erro parseado.
 */
throw json({message:'Could not fetch events.'}, {
  status: 500,

/**Na aula 351 é inserido o código para que quando se clique em um evento
 * ele abra uma página baseada no id do evento, mostrando os detalhes dele.
 * Primeiro, na página EventsList.js onde está o código para todos os eventos
 * é inserido o seguinte Link. Esse link em conjunto com esse código que está
 * no App  {path: ':eventId', element: <EventDetailPage/>, loader: eventDetailLoader},
 * leva à página de detalhes do evento
 */
<Link to={event.id}>

/**Há um componente no backend chamado EventItem, nele está o padrão de como
 * o componente será mostrado ao ser clicado, esse componente é importado e
 * usado no EventDetail.js que, por sua vez, é o componente para o qual
 * a página é direcionada quando se clica no evento. Abaixo, o EventDetail completo
 * */
import { useLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";


function EventDetailPage () {
  /**através da função interna useLoaderData do React Router Dom (RRD) os dados
   * que foram acessados pela função loader abaixo serão guardados no data.
   * */
    const data = useLoaderData();
    /**no componente EventItem tem vários campos do tipo event.algumacoisa
     **/
    return (
        <EventItem event={data.event} />
    );
}
export default EventDetailPage;
/**a função loader carrega o que é obtido no fetch do evento e
 * o traz através do params que aqui guarda o id para passá-lo mais abaixo.
 * Lembrando que o loader tem que ser informado também no App como um props
 */
export async function loader({request, params}) {
    const id = params.eventId;
/** como esse componente vai atingir uma rota dinâmica que vai
 * depender do id do componente, foi criado o fetch abaixo
 */
    const response = await fetch('http://localhost:8080/events/' + id);
/**abaixo a lógica para caso dê erro, conforme já expliquei antes. */
    if(!response.ok) {
        throw json ({message: 'Could not fetch details for selected event.'},
            {status: 500}
        )
    } else {
        return response;
    }
}

/**Na aula 352 é inserida a lógica para editar os posts dos eventos. Abaixo
 * do evento há um botão de edit e é colocado o link que leva para o /edit, no caso
 * o componente EditEvents, lá será retornado o formulário EventForm que contém
 * os mesmos campos do evento. Assim, é preciso que o formulário tenha acesso
 * aos mesmos dados do EventDetail, para isso foi usado o esquema abaixo, o loader
 * foi colocado em um nível mais alto e deu acesso às duas rotas que precisam
 * dos dados e estão no children. Esse também é o esquema para fazer nested routes. No entanto,
 * para que o sistema achei o loader correto, é preciso criar um id e passá-lo nos componentes
 * ou vai dar erro, assim como também é preciso usar o hook useRouteLoaderData que
 * usa um id como um argumento, ou seja, ele vai procurar o id para saber
 * de qual rota carregar os dados
 */

{path: ':eventId', id:'event-detail',  loader: eventDetailLoader,
    children: [
    {index: true, element: <EventDetailPage/>},
    {path: 'edit', element: <EditEventPage />},
  ]},

  /**Assim, no componente EditEvent passa a ser possível carregar os dados*/

  function EditEventPage () {
    const data = useRouteLoaderData('event-detail');
    return <EventForm event={data.event}/>;
}

/**Já no formulário de edição do evento em cada input é preciso passar a linha do deFaultValue
 * abaixo. DefaulValue define o valor inicial padrão do campo */
<input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />

/**Aula 353 e 354 vai postar as informações inseridas no formulário que está no
 * componente EventForm no backend, para isso vai usar algumas funcionalidade do RRD
 * Primeiro, o próprio formulário deve usar Form (q deve ser importado) ao invés de form
 * e o método post
  */
//EventForm
 <Form method='post'

 /**já no New Event está todo o controle de inserção dos dados*/

 import { json, redirect } from "react-router-dom";
 import EventForm from "../components/EventForm";
 //a função retorna (mostra) o formulário em tela
 function NewEventPage () {
     return <EventForm />
 }
 export default NewEventPage;
 /**essa função guardou os dados obtidos no formulário na variável data,
  * sendo request a ação e formData() uma função reservada do RRD, já os dados
  * são obtidos dos campos de acordo com o name do input do eventForm
   */
 export async function action ({request, params}) {
     const data = await request.formData();
     const eventData = {
         title: data.get('title'),
         image: data.get('image'),
         date: data.get('date'),
         description: data.get('description'),
     }
 /**já aqui é a lógica para alcançar o backend q está no http abaixo e postar
  * as informações.
  */
     const response = await fetch('http://localhost:8080/events',{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(eventData)
     });
     if (!response.ok) {
         throw json({message: 'Could not save event'}, {status: 500});
     }
 /**após a ação o usuário é redirecionado para o endereço abaixo */
     return redirect('/events');
 }


 /**App.js */

 import NewEventPage, {action as newEventAction}  from './pages/NewEvent';


 {path: 'new', element: <NewEventPage />, action: newEventAction },

 /**A aula 355 primeiro mostra que é possível utilizar uma action de outra página
  * para isso, basta colocar o path da página...
  * depois, mostra como deletar um evento usando o RRD
  * Primeiro, no EventItem.js que é o componente que estabelece
  * o padrão para os itens, é inserida a função abaixo, o useSubmit é um hook do RRD
  * e permite a submissão automática da função se algo for true, nesse caso, o proceed
  * que guarda a resposta do window.confirm que é aquela tela padrão de confirmação
  * q aparece no browser, assim, se a resposta for sim, o proceed é true o submit é aciona
  * O submit leva dois parâmetros, o primeiro, dados q ele pode carregar, nesse caso
  * não há e o segundo, o método. Com isso, não é necessário usar aquela lógica
  * do botão que aciona uma função e tals...
  */
 function EventItem({ event }) {
    const submit = useSubmit();
 function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');
    if (proceed) {
      submit(null, {method: 'delete'})
    }
  }}
/**Na página EventDetail.js que acho q é a página para carregar dinâmicamente o 
 * evento, é inserida a action abaixo que pega o eventId para usá-lo no endereço do fetch
 * e usa dinâmicamente o method de acordo com o q é setado, nesse caso, o dele
 */
export function action({params, request}) {
    const eventId = params.eventId;
    const response = fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    })
    if(!response.ok) {
        throw json ({message: 'Could not delete event.'},
            {status: 500}
        )
    } else {
        return redirect('/events');
    }
}

  /**No app é preciso importar a action */

  import EventDetailPage, {loader as eventDetailLoader, action as deleteEventAction} from './pages/EventDetail';
  {path: 'edit', element: <EditEventPage />, action: deleteEventAction },

  /**Aula 356 foi usado um hook para controlar a UI com base no status de
   * um requerimento, no caso, quando o Form é submetido ao se criar
   * um novo elemento, os botões de save e edit devem ficar desabilitados
   * para isso foi usado o useNavigation que dá acesso a vários dados
   * entre eles o status. Assim, no EventForm, foi inserida a seguinte lógica.
   * Pelo q entendi, submitting é um controle interno do status.
   */

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>

  /**na aula 357 é inserido um código de validação dos campos de input do
   * EventForm, pois, apesar de já existir validação no backend e estar
   * escrito required em cada input, esse required pode ser retirado com a extensão
   * dev tools, por exemplo. Então o código a seguir vai servir para mostrar
   * o erro, caso a validação do frontend não funcione. 
   * No componente NewEvent.js foi inserido o código abaixo, sendo que o 422
   * foi criado no backend justamente para problemas de validação e assim ele vai
   * retornar a "response" q lá estiver
   */
  if (response.status === 422) {
    return response;
}
/**Então no componente EventForm (q é retornado no NewEvent.js) é importado
 * o hook do RRD useActionData q faz quase o mesmo q useLoaderData, ou seja,
 * dá acesso aos dados retornados pela action, nesse caso, pelo action mais próxima
 * q é a do NewEvent q, como disse, é quem renderiza o EventForm. Desta forma, dentro
 * do Form é inserido o código abaixo, ou seja, se houver data (se o formulário for
 * submetido) e se houver erros é feito um map e esse erros são mostrados na tela
 * do formulário ao invés do usuário simplesmente ser redirecionado para uma tela
 * de erro.
 */
{data && data.errors && (
    <ul>
      {Object.values(data.errors).map((err) =>(
      <li key={err}>{err}</li>))}
    </ul>
  )}

  /**Na aula 358 é inserida a lógica para o edit do formulário funcionar,
   * como o código é quase o mesmo do NewEvent, ou seja, o código para inserir
   * um novo evento e editar um já existente é quase o mesmo, então a lógica
   * do código foi transferida de NewEvent para o EventForm e foram feitos os ajustes como
   * o method q ao invés de ser digitado diretamente no código foi digitado no componente
   * e usado dinâmicamente como PATCH ou post, assim como também o link. Também
   * foi necessário ajustar as actions recebidas no App.js
   */
  /**Na aula 359 é inserido mais código para incluir um input de Signup, ou seja,
   * um campo para inserir o e-mail e do lado um botão, esse campo está na página principal
   * e em todas as páginas, foram inseridos vários novos componentes e mudando no APP.
   * No componente Newsletter.js é usado o hook do RRD { useFetcher } para evitar
   * uma mudança de rota quando o formulário for submetido, o código fica assim:
   */
  /**O useFetcher dá acesso ao form, state, data, entre outros, então, abaixo,
   * se o state for "idle" palavra interna q significa q o formulário já foi submetido
   * e se houver data e se houver mensagem (q é determinada no componente), esta é exibida
   * no alert
   */
    const fetcher = useFetcher();
    const {data, state} = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);
    // o formulário tem q usar essa sintaxe abaixo
    return (
        <fetcher.Form 
/**defer significa adiar
 * A aula 360 apresenta um novo hook para usarmos enquanto os dados não são carregados
 * podendo inserir um is Loading, por exemplo e mostrando partes da página antes, se
 * quiser.
 * No component Events.js
 */

import EventsList from '../components/EventsList';
import {json, useLoaderData, defer, Await} from 'react-router-dom';
import { Suspense } from 'react';

function EventsPage() {
    //esse {events} foi setado na função abaixo como uma promisse dos valores q serão
    //carregados
  const {events} = useLoaderData();
  return (
    /** O Suspense (suspenso) é um componente do React para mostrar um fallback enquanto
     * algo é carregado
     */
  <Suspense fallback={<p style={{textAlign: 'center '}}>Loading...</p>}>

/**Essa tag é própria do RRD, ela tem um resolve, então o await vai esperar
    o events resolver, ou seja, os dados carregarem e quando carregarem, a função
    abaixo nominada loadedEvents vai executar o componente EventsList já com os dados
    do events*/
  <Await resolve={events}>
    {(loadedEvents) => <EventsList events={loadedEvents}/>}
  </Await>
  </Suspense>); 
}

export default EventsPage;
//A função q antes estava no loader, foi colocada nessa nova
async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
      if (!response.ok) {
       
        throw json({message:'Could not fetch events.'}, {
          status: 500,
        });
         } else {
        const resData = await response.json();
        return resData.events;
       }
}
/**agora dentro do loader é retornada uma função defer para a qual
 * é passada um objeto q deve reunir todos os requerimento http q estiverem ocorrendo
 * na página, se, por exemplo, houverem vários requerimentos na página e quiser
 * se esperar todos. Aqui um request para buscar os eventos q estão no backend chamando a função
 * q está acima
*/
export function loader() {
    return defer ({
      events: loadEvents()
    })
     };
  /**Na aula 361 vai explicar o defer renderizando mais
   * de um evento, para isso, no EventDetail.js é passado
   * mais um componente no return o EventItem e o EventsList que 
   * para ter acesso aos eventos, foi copiado mais uma função
   * loadEvent, que não vou copiar aqui, mas q é a função para
   * dar acesso aos eventos. 
   */
  //essa variável abaixo é para dar acesso aos dados, antes era data, mais
  //abaixo ela é passada no defer
  function EventDetailPage () {
    const {event, events} = useRouteLoaderData('event-detail');
/**Suspense vai aparecer enquanto o Await não resolve e ele será resolvido
 * quando o defer for resolvido e os dados forem passados
 */
  return (
    <>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
            {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
        </Suspense>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
            {loadedEvents => <EventsList event={loadedEvents} />}
        </Await>
        </Suspense>   
    </>

    /**Como cada componente vai ter um tempo diferente de
     * carregamento, dentro do loader, foi usado o defer,
     * loadEvent e loadEvents é o nome das funções helpers e o await
     * é para controlar que a data deve carregar completamente antes do componente
     * aparecer
     */
    
    export async function loader({request, params}) {
        const id = params.eventId;
        return defer({
            event: await loadEvent(id),
            events: loadEvents(),
        });