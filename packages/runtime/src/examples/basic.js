createApp({
    state: 0,
    reducers: {
        add: (state, amount) => state + amount,
    },
    view: (state, emit) =>
        h('button',
            { on: { click: () => emit('add', 1) } },
            [state]
        ),
}).mount(document.body)