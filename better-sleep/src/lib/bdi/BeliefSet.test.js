const BeliefSet = require('./BeliefSet')

test('BeliefSet.constructor', () => {
    let beliefs = new BeliefSet({'kitchen-light': 'off'})
    //expect(beliefs.getBelief('kitchen_light')).toThrow('Predicate with name kitchen_light does not exist') 
    expect(beliefs.getBelief('kitchen-light')).toBe('off')
})

test('BeliefSet.setPredicate', () => {
    let beliefs = new BeliefSet({'kitchen-light': 'off'})
    //expect(beliefs.getBelief('kitchen_light')).toThrow('Predicate with name kitchen_light does not exist') 
    expect(beliefs.getBelief('kitchen-light')).toBe('off')

    beliefs.setPredicate('kitchen-light', 'on')
    expect(beliefs.getBelief('kitchen-light')).toBe('on')
})

test('BeliefSet.includesPredicate', () => {
    let beliefs = new BeliefSet({'kitchen-light': 'off'})
    //expect(beliefs.getBelief('kitchen_light')).toThrow('Predicate with name kitchen_light does not exist') 
    expect(beliefs.includesPredicate('kitchen-light')).toBe(true)
    expect(beliefs.includesPredicate('bedroom-light')).toBe(false)
})
