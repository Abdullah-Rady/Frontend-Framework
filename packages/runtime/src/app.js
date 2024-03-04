import { destroyDOM } from "./destroy-dom";
import { mountDOM } from "./mount-dom";
import { Dispatcher } from './dispatcher'
import { patchDOM } from './patch-dom'

export function createApp({state, view, reducers = {}}){

    let parentEl = null
    let vdom = null

    const dispatcher = new Dispatcher()
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)]

    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload)
    }

    for (const actionName in reducers) {
        const reducer = reducers[actionName]
        
        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload) 
        })
        
        subscriptions.push(subs)
    }

    function renderApp(){
        
        if(vdom){
            destroyDOM(vdom)
        }
        
        vdom = view(state, emit)

        const newVdom = view(state, emit)

        mountDOM(vdom, parentEl)
        
        vdom = patchDOM(vdom, newVdom, parentEl)
    }

    return {
        mount(_parentEl){
            parentEl = _parentEl
            renderApp()
            vdom = view(state, emit)
            mountDOM(vdom, parentEl)
        },
        
        unmount() {
            destroyDOM(vdom)
            vdom = null
            subscriptions.forEach((unsubscribe) => unsubscribe())
        }
    }


}