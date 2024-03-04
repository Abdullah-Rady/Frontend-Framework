console.log('This will soon be a frontend framework!')

const vdom = h('form', { class: 'login-form', action: 'login' }, [
    h('input', { type: 'text', name: 'user' }),
    h('input', { type: 'password', name: 'pass' }),
    h('button', { on: { click: () => console.log("login") } }, ['Login'])
    ]
)

mountDOM(vdom, document.body)
