describe('tinybind.ComponentBinding', function() {
  var scope, element, component, componentRoot;
    
  beforeEach(function() {
    element = document.createElement('div');
    element.innerHTML = `<test></test>`;
    componentRoot = element.firstChild;
    scope = { name: 'Tinybind' };
    component = tinybind.components.test = {
      initialize: sinon.stub().returns(scope),
      template: function() { return ''; }
    };
  });
    
  it('renders "template" as a string', function() {
    component.template = function() {return '<h1>test</h1>'; };
    tinybind.bind(element);
    
    componentRoot.innerHTML.should.equal(component.template());
  });
    
  it('binds binders on component root element only once', function() {
    tinybind.binders['test-binder'] = sinon.spy();
    componentRoot.setAttribute('rv-test-binder', 'true');
    tinybind.bind(element);
    
    tinybind.binders['test-binder'].calledOnce.should.be.true();
    
    delete tinybind.binders['test-binder'];
  });
    
  describe('initialize()', function() {
    var locals;
    
    beforeEach(function() {
      locals = { object: { name: 'Tinybind locals' } };
      componentRoot.setAttribute('item', 'object');
    });
    
    it('receives element as first argument and attributes as second', function() {
      tinybind.bind(element, locals);
    
      component.initialize.calledWith(componentRoot, { item: locals.object }).should.be.true();
    });
    
    it('receives primitives attributes', function() {
      // need to rework how bind primitive values
      componentRoot.setAttribute('primitivestring', "'value'");
      componentRoot.setAttribute('primitivenumber', "42");
      componentRoot.setAttribute('primitiveboolean', "true");
      tinybind.bind(element, locals);
    
      component.initialize.calledWith(componentRoot, { item: locals.object,
        primitivestring: 'value',
        primitivenumber: 42,
        primitiveboolean: true })
      .should.be.true();
    });
    
    it('returns attributes assigned to "primitives" property as they are', function() {
      var type = 'text';
    
      component.primitives = ['type'];
      componentRoot.setAttribute('type', type);
      tinybind.bind(element, locals);
    
      component.initialize.calledWith(componentRoot, { item: locals.object, type: type }).should.be.true();
    });
  });
    
  describe('when "template" is a function', function() {
    it('renders returned string as component template', function() {
      component.template = sinon.stub().returns('<h1>{ name }</h1>');
      tinybind.bind(element);
    
      componentRoot.innerHTML.should.equal('<h1>' + scope.name + '</h1>');
    });
  });
    
});