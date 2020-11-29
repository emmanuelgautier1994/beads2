
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.30.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Logo.svelte generated by Svelte v3.30.0 */

    const file = "src/Logo.svelte";

    function create_fragment(ctx) {
    	let div1;
    	let div0;
    	let span0;
    	let t1;
    	let span1;
    	let t3;
    	let span2;
    	let t5;
    	let span3;
    	let t7;
    	let span4;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "B";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "e";
    			t3 = space();
    			span2 = element("span");
    			span2.textContent = "a";
    			t5 = space();
    			span3 = element("span");
    			span3.textContent = "d";
    			t7 = space();
    			span4 = element("span");
    			span4.textContent = "s";
    			attr_dev(span0, "class", "letter-b svelte-g6crc9");
    			add_location(span0, file, 2, 4, 45);
    			attr_dev(span1, "class", "letter-e svelte-g6crc9");
    			add_location(span1, file, 3, 4, 81);
    			attr_dev(span2, "class", "letter-a svelte-g6crc9");
    			add_location(span2, file, 4, 4, 117);
    			attr_dev(span3, "class", "letter-d svelte-g6crc9");
    			add_location(span3, file, 5, 4, 153);
    			attr_dev(span4, "class", "letter-s svelte-g6crc9");
    			add_location(span4, file, 6, 4, 189);
    			attr_dev(div0, "class", "title svelte-g6crc9");
    			add_location(div0, file, 1, 2, 21);
    			attr_dev(div1, "class", "cell svelte-g6crc9");
    			add_location(div1, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(div0, t3);
    			append_dev(div0, span2);
    			append_dev(div0, t5);
    			append_dev(div0, span3);
    			append_dev(div0, t7);
    			append_dev(div0, span4);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Logo", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Logo> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/ConfigPanelGrid.svelte generated by Svelte v3.30.0 */

    const file$1 = "src/ConfigPanelGrid.svelte";
    const get_go_button_slot_changes = dirty => ({});
    const get_go_button_slot_context = ctx => ({});
    const get_slider_slot_changes = dirty => ({});
    const get_slider_slot_context = ctx => ({});
    const get_label_slot_changes = dirty => ({});
    const get_label_slot_context = ctx => ({});
    const get_rotate_buttons_slot_changes = dirty => ({});
    const get_rotate_buttons_slot_context = ctx => ({});

    // (8:2) {#if configuring}
    function create_if_block(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[3].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[2], get_label_slot_context);
    	const slider_slot_template = /*#slots*/ ctx[3].slider;
    	const slider_slot = create_slot(slider_slot_template, ctx, /*$$scope*/ ctx[2], get_slider_slot_context);
    	const go_button_slot_template = /*#slots*/ ctx[3]["go-button"];
    	const go_button_slot = create_slot(go_button_slot_template, ctx, /*$$scope*/ ctx[2], get_go_button_slot_context);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			if (label_slot) label_slot.c();
    			t0 = space();
    			div1 = element("div");
    			if (slider_slot) slider_slot.c();
    			t1 = space();
    			div2 = element("div");
    			if (go_button_slot) go_button_slot.c();
    			attr_dev(div0, "class", "cell cell-label svelte-mdu8in");
    			add_location(div0, file$1, 8, 4, 220);
    			attr_dev(div1, "class", "cell cell-slider svelte-mdu8in");
    			add_location(div1, file$1, 9, 4, 281);
    			attr_dev(div2, "class", "cell cell-go-button svelte-mdu8in");
    			add_location(div2, file$1, 10, 4, 344);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			if (label_slot) {
    				label_slot.m(div0, null);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);

    			if (slider_slot) {
    				slider_slot.m(div1, null);
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);

    			if (go_button_slot) {
    				go_button_slot.m(div2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (label_slot) {
    				if (label_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(label_slot, label_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_label_slot_changes, get_label_slot_context);
    				}
    			}

    			if (slider_slot) {
    				if (slider_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(slider_slot, slider_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_slider_slot_changes, get_slider_slot_context);
    				}
    			}

    			if (go_button_slot) {
    				if (go_button_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(go_button_slot, go_button_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_go_button_slot_changes, get_go_button_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			transition_in(slider_slot, local);
    			transition_in(go_button_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			transition_out(slider_slot, local);
    			transition_out(go_button_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (label_slot) label_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (slider_slot) slider_slot.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (go_button_slot) go_button_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(8:2) {#if configuring}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let current;
    	const rotate_buttons_slot_template = /*#slots*/ ctx[3]["rotate-buttons"];
    	const rotate_buttons_slot = create_slot(rotate_buttons_slot_template, ctx, /*$$scope*/ ctx[2], get_rotate_buttons_slot_context);
    	let if_block = /*configuring*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (rotate_buttons_slot) rotate_buttons_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "cell cell-rotate-buttons svelte-mdu8in");
    			add_location(div0, file$1, 6, 2, 121);
    			attr_dev(div1, "class", "grid svelte-mdu8in");
    			toggle_class(div1, "painting", /*painting*/ ctx[0]);
    			toggle_class(div1, "configuring", /*configuring*/ ctx[1]);
    			add_location(div1, file$1, 5, 0, 67);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (rotate_buttons_slot) {
    				rotate_buttons_slot.m(div0, null);
    			}

    			append_dev(div1, t);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (rotate_buttons_slot) {
    				if (rotate_buttons_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(rotate_buttons_slot, rotate_buttons_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_rotate_buttons_slot_changes, get_rotate_buttons_slot_context);
    				}
    			}

    			if (/*configuring*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*configuring*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*painting*/ 1) {
    				toggle_class(div1, "painting", /*painting*/ ctx[0]);
    			}

    			if (dirty & /*configuring*/ 2) {
    				toggle_class(div1, "configuring", /*configuring*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rotate_buttons_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rotate_buttons_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (rotate_buttons_slot) rotate_buttons_slot.d(detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ConfigPanelGrid", slots, ['rotate-buttons','label','slider','go-button']);
    	let { painting } = $$props;
    	let { configuring } = $$props;
    	const writable_props = ["painting", "configuring"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ConfigPanelGrid> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("painting" in $$props) $$invalidate(0, painting = $$props.painting);
    		if ("configuring" in $$props) $$invalidate(1, configuring = $$props.configuring);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ painting, configuring });

    	$$self.$inject_state = $$props => {
    		if ("painting" in $$props) $$invalidate(0, painting = $$props.painting);
    		if ("configuring" in $$props) $$invalidate(1, configuring = $$props.configuring);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [painting, configuring, $$scope, slots];
    }

    class ConfigPanelGrid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { painting: 0, configuring: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConfigPanelGrid",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*painting*/ ctx[0] === undefined && !("painting" in props)) {
    			console.warn("<ConfigPanelGrid> was created without expected prop 'painting'");
    		}

    		if (/*configuring*/ ctx[1] === undefined && !("configuring" in props)) {
    			console.warn("<ConfigPanelGrid> was created without expected prop 'configuring'");
    		}
    	}

    	get painting() {
    		throw new Error("<ConfigPanelGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set painting(value) {
    		throw new Error("<ConfigPanelGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get configuring() {
    		throw new Error("<ConfigPanelGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set configuring(value) {
    		throw new Error("<ConfigPanelGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ConfigPanel.svelte generated by Svelte v3.30.0 */
    const file$2 = "src/ConfigPanel.svelte";

    // (16:4) <div slot='rotate-buttons'>
    function create_rotate_buttons_slot(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "L";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "R";
    			attr_dev(button0, "class", "svelte-ij9clm");
    			add_location(button0, file$2, 16, 6, 464);
    			attr_dev(button1, "class", "svelte-ij9clm");
    			add_location(button1, file$2, 17, 6, 511);
    			attr_dev(div, "slot", "rotate-buttons");
    			add_location(div, file$2, 15, 4, 430);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*rotateLeft*/ ctx[5], false, false, false),
    					listen_dev(button1, "click", /*rotateRight*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_rotate_buttons_slot.name,
    		type: "slot",
    		source: "(16:4) <div slot='rotate-buttons'>",
    		ctx
    	});

    	return block;
    }

    // (20:4) <p slot='label' class='label'>
    function create_label_slot(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*gridSize*/ ctx[0]);
    			t1 = text(" x ");
    			t2 = text(/*gridSize*/ ctx[0]);
    			attr_dev(p, "slot", "label");
    			attr_dev(p, "class", "label svelte-ij9clm");
    			add_location(p, file$2, 19, 4, 568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*gridSize*/ 1) set_data_dev(t0, /*gridSize*/ ctx[0]);
    			if (dirty & /*gridSize*/ 1) set_data_dev(t2, /*gridSize*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_label_slot.name,
    		type: "slot",
    		source: "(20:4) <p slot='label' class='label'>",
    		ctx
    	});

    	return block;
    }

    // (21:4) <input type='range' slot='slider' bind:value={gridSize} min={5} max={50} step={1}>
    function create_slider_slot(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let input_step_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "slot", "slider");
    			attr_dev(input, "min", input_min_value = 5);
    			attr_dev(input, "max", input_max_value = 50);
    			attr_dev(input, "step", input_step_value = 1);
    			attr_dev(input, "class", "svelte-ij9clm");
    			add_location(input, file$2, 20, 4, 630);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*gridSize*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[7]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*gridSize*/ 1) {
    				set_input_value(input, /*gridSize*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_slider_slot.name,
    		type: "slot",
    		source: "(21:4) <input type='range' slot='slider' bind:value={gridSize} min={5} max={50} step={1}>",
    		ctx
    	});

    	return block;
    }

    // (22:4) <button slot='go-button' class='go-button' on:click={toggleStep}>
    function create_go_button_slot(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Go!";
    			attr_dev(button, "slot", "go-button");
    			attr_dev(button, "class", "go-button svelte-ij9clm");
    			add_location(button, file$2, 21, 4, 717);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*toggleStep*/ ctx[3])) /*toggleStep*/ ctx[3].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_go_button_slot.name,
    		type: "slot",
    		source: "(22:4) <button slot='go-button' class='go-button' on:click={toggleStep}>",
    		ctx
    	});

    	return block;
    }

    // (15:2) <ConfigPanelGrid {...{configuring, painting}}>
    function create_default_slot(ctx) {
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = space();
    			t1 = space();
    			t2 = space();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(15:2) <ConfigPanelGrid {...{configuring, painting}}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let configpanelgrid;
    	let current;

    	const configpanelgrid_spread_levels = [
    		{
    			configuring: /*configuring*/ ctx[1],
    			painting: /*painting*/ ctx[2]
    		}
    	];

    	let configpanelgrid_props = {
    		$$slots: {
    			default: [create_default_slot],
    			"go-button": [create_go_button_slot],
    			slider: [create_slider_slot],
    			label: [create_label_slot],
    			"rotate-buttons": [create_rotate_buttons_slot]
    		},
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < configpanelgrid_spread_levels.length; i += 1) {
    		configpanelgrid_props = assign(configpanelgrid_props, configpanelgrid_spread_levels[i]);
    	}

    	configpanelgrid = new ConfigPanelGrid({
    			props: configpanelgrid_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(configpanelgrid.$$.fragment);
    			attr_dev(div, "class", "cell svelte-ij9clm");
    			add_location(div, file$2, 13, 0, 358);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(configpanelgrid, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const configpanelgrid_changes = (dirty & /*configuring, painting*/ 6)
    			? get_spread_update(configpanelgrid_spread_levels, [
    					{
    						configuring: /*configuring*/ ctx[1],
    						painting: /*painting*/ ctx[2]
    					}
    				])
    			: {};

    			if (dirty & /*$$scope, toggleStep, gridSize*/ 265) {
    				configpanelgrid_changes.$$scope = { dirty, ctx };
    			}

    			configpanelgrid.$set(configpanelgrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(configpanelgrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(configpanelgrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(configpanelgrid);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ConfigPanel", slots, []);
    	let { gridSize } = $$props;
    	let { layoutRotation } = $$props;
    	let { configuring } = $$props;
    	let { painting } = $$props;
    	let { toggleStep } = $$props;

    	const rotateRight = () => {
    		$$invalidate(6, layoutRotation = (layoutRotation + 90) % 360);
    	};

    	const rotateLeft = () => {
    		$$invalidate(6, layoutRotation = (layoutRotation - 90 + 360) % 360);
    	};

    	const writable_props = ["gridSize", "layoutRotation", "configuring", "painting", "toggleStep"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ConfigPanel> was created with unknown prop '${key}'`);
    	});

    	function input_change_input_handler() {
    		gridSize = to_number(this.value);
    		$$invalidate(0, gridSize);
    	}

    	$$self.$$set = $$props => {
    		if ("gridSize" in $$props) $$invalidate(0, gridSize = $$props.gridSize);
    		if ("layoutRotation" in $$props) $$invalidate(6, layoutRotation = $$props.layoutRotation);
    		if ("configuring" in $$props) $$invalidate(1, configuring = $$props.configuring);
    		if ("painting" in $$props) $$invalidate(2, painting = $$props.painting);
    		if ("toggleStep" in $$props) $$invalidate(3, toggleStep = $$props.toggleStep);
    	};

    	$$self.$capture_state = () => ({
    		ConfigPanelGrid,
    		gridSize,
    		layoutRotation,
    		configuring,
    		painting,
    		toggleStep,
    		rotateRight,
    		rotateLeft
    	});

    	$$self.$inject_state = $$props => {
    		if ("gridSize" in $$props) $$invalidate(0, gridSize = $$props.gridSize);
    		if ("layoutRotation" in $$props) $$invalidate(6, layoutRotation = $$props.layoutRotation);
    		if ("configuring" in $$props) $$invalidate(1, configuring = $$props.configuring);
    		if ("painting" in $$props) $$invalidate(2, painting = $$props.painting);
    		if ("toggleStep" in $$props) $$invalidate(3, toggleStep = $$props.toggleStep);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		gridSize,
    		configuring,
    		painting,
    		toggleStep,
    		rotateRight,
    		rotateLeft,
    		layoutRotation,
    		input_change_input_handler
    	];
    }

    class ConfigPanel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			gridSize: 0,
    			layoutRotation: 6,
    			configuring: 1,
    			painting: 2,
    			toggleStep: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConfigPanel",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*gridSize*/ ctx[0] === undefined && !("gridSize" in props)) {
    			console.warn("<ConfigPanel> was created without expected prop 'gridSize'");
    		}

    		if (/*layoutRotation*/ ctx[6] === undefined && !("layoutRotation" in props)) {
    			console.warn("<ConfigPanel> was created without expected prop 'layoutRotation'");
    		}

    		if (/*configuring*/ ctx[1] === undefined && !("configuring" in props)) {
    			console.warn("<ConfigPanel> was created without expected prop 'configuring'");
    		}

    		if (/*painting*/ ctx[2] === undefined && !("painting" in props)) {
    			console.warn("<ConfigPanel> was created without expected prop 'painting'");
    		}

    		if (/*toggleStep*/ ctx[3] === undefined && !("toggleStep" in props)) {
    			console.warn("<ConfigPanel> was created without expected prop 'toggleStep'");
    		}
    	}

    	get gridSize() {
    		throw new Error("<ConfigPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gridSize(value) {
    		throw new Error("<ConfigPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layoutRotation() {
    		throw new Error("<ConfigPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set layoutRotation(value) {
    		throw new Error("<ConfigPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get configuring() {
    		throw new Error("<ConfigPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set configuring(value) {
    		throw new Error("<ConfigPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get painting() {
    		throw new Error("<ConfigPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set painting(value) {
    		throw new Error("<ConfigPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toggleStep() {
    		throw new Error("<ConfigPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggleStep(value) {
    		throw new Error("<ConfigPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/PaintingToolbox.svelte generated by Svelte v3.30.0 */

    const file$3 = "src/PaintingToolbox.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let t0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("painting toolbox\n  ");
    			button = element("button");
    			button.textContent = "Reset";
    			add_location(button, file$3, 6, 2, 84);
    			attr_dev(div, "class", "cell svelte-3u0j4x");
    			add_location(div, file$3, 4, 0, 44);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*toggleStep*/ ctx[0])) /*toggleStep*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PaintingToolbox", slots, []);
    	let { toggleStep } = $$props;
    	const writable_props = ["toggleStep"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PaintingToolbox> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("toggleStep" in $$props) $$invalidate(0, toggleStep = $$props.toggleStep);
    	};

    	$$self.$capture_state = () => ({ toggleStep });

    	$$self.$inject_state = $$props => {
    		if ("toggleStep" in $$props) $$invalidate(0, toggleStep = $$props.toggleStep);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [toggleStep];
    }

    class PaintingToolbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { toggleStep: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PaintingToolbox",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*toggleStep*/ ctx[0] === undefined && !("toggleStep" in props)) {
    			console.warn("<PaintingToolbox> was created without expected prop 'toggleStep'");
    		}
    	}

    	get toggleStep() {
    		throw new Error("<PaintingToolbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggleStep(value) {
    		throw new Error("<PaintingToolbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Workspace.svelte generated by Svelte v3.30.0 */

    const file$4 = "src/Workspace.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "cell svelte-1bjus1p");
    			add_location(div, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Workspace", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Workspace> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Workspace extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Workspace",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Bead.svelte generated by Svelte v3.30.0 */

    const file$5 = "src/Bead.svelte";

    function create_fragment$5(ctx) {
    	let rect;

    	let rect_levels = [
    		{
    			id: /*id*/ ctx[0],
    			x: /*x*/ ctx[1],
    			y: /*y*/ ctx[2],
    			width: /*width*/ ctx[3],
    			height: /*height*/ ctx[4],
    			fill: /*fill*/ ctx[5]
    		},
    		{ stroke: "black" },
    		{ "stroke-width": "0.1" }
    	];

    	let rect_data = {};

    	for (let i = 0; i < rect_levels.length; i += 1) {
    		rect_data = assign(rect_data, rect_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			set_svg_attributes(rect, rect_data);
    			toggle_class(rect, "svelte-1rmw8na", true);
    			add_location(rect, file$5, 13, 0, 189);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(rect, rect_data = get_spread_update(rect_levels, [
    				dirty & /*id, x, y, width, height, fill*/ 63 && {
    					id: /*id*/ ctx[0],
    					x: /*x*/ ctx[1],
    					y: /*y*/ ctx[2],
    					width: /*width*/ ctx[3],
    					height: /*height*/ ctx[4],
    					fill: /*fill*/ ctx[5]
    				},
    				{ stroke: "black" },
    				{ "stroke-width": "0.1" }
    			]));

    			toggle_class(rect, "svelte-1rmw8na", true);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Bead", slots, []);
    	let { id } = $$props;
    	let { x } = $$props;
    	let { y } = $$props;
    	let { width } = $$props;
    	let { height } = $$props;
    	let fill = "white";
    	const writable_props = ["id", "x", "y", "width", "height"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Bead> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("x" in $$props) $$invalidate(1, x = $$props.x);
    		if ("y" in $$props) $$invalidate(2, y = $$props.y);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("height" in $$props) $$invalidate(4, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({ id, x, y, width, height, fill });

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("x" in $$props) $$invalidate(1, x = $$props.x);
    		if ("y" in $$props) $$invalidate(2, y = $$props.y);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("height" in $$props) $$invalidate(4, height = $$props.height);
    		if ("fill" in $$props) $$invalidate(5, fill = $$props.fill);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*id*/ 1) {
    			 if (id < 25) $$invalidate(5, fill = "red");
    		}

    		if ($$self.$$.dirty & /*id*/ 1) {
    			 if (id > 25) $$invalidate(5, fill = "blue");
    		}
    	};

    	return [id, x, y, width, height, fill];
    }

    class Bead extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { id: 0, x: 1, y: 2, width: 3, height: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bead",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !("id" in props)) {
    			console.warn("<Bead> was created without expected prop 'id'");
    		}

    		if (/*x*/ ctx[1] === undefined && !("x" in props)) {
    			console.warn("<Bead> was created without expected prop 'x'");
    		}

    		if (/*y*/ ctx[2] === undefined && !("y" in props)) {
    			console.warn("<Bead> was created without expected prop 'y'");
    		}

    		if (/*width*/ ctx[3] === undefined && !("width" in props)) {
    			console.warn("<Bead> was created without expected prop 'width'");
    		}

    		if (/*height*/ ctx[4] === undefined && !("height" in props)) {
    			console.warn("<Bead> was created without expected prop 'height'");
    		}
    	}

    	get id() {
    		throw new Error("<Bead>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Bead>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get x() {
    		throw new Error("<Bead>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<Bead>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<Bead>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<Bead>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Bead>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Bead>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Bead>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Bead>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Canvas.svelte generated by Svelte v3.30.0 */
    const file$6 = "src/Canvas.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (58:2) {#each beads as bead (bead.id)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let bead;
    	let current;
    	const bead_spread_levels = [/*bead*/ ctx[10]];
    	let bead_props = {};

    	for (let i = 0; i < bead_spread_levels.length; i += 1) {
    		bead_props = assign(bead_props, bead_spread_levels[i]);
    	}

    	bead = new Bead({ props: bead_props, $$inline: true });

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(bead.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(bead, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bead_changes = (dirty & /*beads*/ 2)
    			? get_spread_update(bead_spread_levels, [get_spread_object(/*bead*/ ctx[10])])
    			: {};

    			bead.$set(bead_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bead.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bead.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(bead, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(58:2) {#each beads as bead (bead.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let svg;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let each_value = /*beads*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*bead*/ ctx[10].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[0]);
    			attr_dev(svg, "class", "svelte-u89dj0");
    			add_location(svg, file$6, 56, 0, 1641);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(svg, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*beads*/ 2) {
    				const each_value = /*beads*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, svg, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if (!current || dirty & /*viewBox*/ 1) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const beadSizeRatio = 0.82;
    const beadHeight = 2;

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Canvas", slots, []);
    	let { gridSize } = $$props;
    	let { layoutRotation } = $$props;
    	let { painting } = $$props;
    	const range = s => [...Array(s).keys()];
    	const beadWidth = 2 * beadSizeRatio;

    	const makeBeads = (size, h, w, totalH, totalW, angle) => {
    		switch (angle) {
    			case 90:
    				return range(size).flatMap(i => range(size).flatMap(j => ({
    					id: i * size + j,
    					x: totalH - (i % 2 ? h * (j + 1) : h * (j + 1.5)),
    					y: w * (i + 1.5) + 3,
    					height: w,
    					width: h
    				})));
    			case 180:
    				return range(size).flatMap(i => range(size).flatMap(j => ({
    					id: i * size + j,
    					x: totalW - w * (i + 1.5) - 6,
    					y: totalH - (i % 2 ? h * (j + 1) : h * (j + 1.5)) + 1,
    					height: h,
    					width: w
    				})));
    			case 270:
    				return range(size).flatMap(i => range(size).flatMap(j => ({
    					id: i * size + j,
    					x: i % 2 ? h * (j + 1) : h * (j + 1.5) - 2,
    					y: totalW - (w * (i + 1.5) + 3) - 2,
    					height: w,
    					width: h
    				})));
    			default:
    				return range(size).flatMap(i => range(size).flatMap(j => ({
    					id: i * size + j,
    					x: w * (i + 1.5) + 2,
    					y: i % 2 ? h * (j + 1) : h * (j + 1.5),
    					height: h,
    					width: w
    				})));
    		}
    	};

    	const writable_props = ["gridSize", "layoutRotation", "painting"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Canvas> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("gridSize" in $$props) $$invalidate(2, gridSize = $$props.gridSize);
    		if ("layoutRotation" in $$props) $$invalidate(3, layoutRotation = $$props.layoutRotation);
    		if ("painting" in $$props) $$invalidate(4, painting = $$props.painting);
    	};

    	$$self.$capture_state = () => ({
    		Bead,
    		gridSize,
    		layoutRotation,
    		painting,
    		range,
    		beadSizeRatio,
    		beadWidth,
    		beadHeight,
    		makeBeads,
    		totalSideWidth,
    		totalSideHeight,
    		viewBox,
    		beads
    	});

    	$$self.$inject_state = $$props => {
    		if ("gridSize" in $$props) $$invalidate(2, gridSize = $$props.gridSize);
    		if ("layoutRotation" in $$props) $$invalidate(3, layoutRotation = $$props.layoutRotation);
    		if ("painting" in $$props) $$invalidate(4, painting = $$props.painting);
    		if ("totalSideWidth" in $$props) $$invalidate(5, totalSideWidth = $$props.totalSideWidth);
    		if ("totalSideHeight" in $$props) $$invalidate(6, totalSideHeight = $$props.totalSideHeight);
    		if ("viewBox" in $$props) $$invalidate(0, viewBox = $$props.viewBox);
    		if ("beads" in $$props) $$invalidate(1, beads = $$props.beads);
    	};

    	let totalSideWidth;
    	let totalSideHeight;
    	let viewBox;
    	let beads;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*gridSize*/ 4) {
    			 $$invalidate(5, totalSideWidth = 2 * (gridSize + 1));
    		}

    		if ($$self.$$.dirty & /*gridSize*/ 4) {
    			 $$invalidate(6, totalSideHeight = 2 * (gridSize + 2));
    		}

    		if ($$self.$$.dirty & /*totalSideWidth, totalSideHeight*/ 96) {
    			 $$invalidate(0, viewBox = `0 0 ${totalSideWidth} ${totalSideHeight}`);
    		}

    		if ($$self.$$.dirty & /*gridSize, totalSideWidth, totalSideHeight, layoutRotation*/ 108) {
    			 $$invalidate(1, beads = makeBeads(gridSize, beadHeight, beadWidth, totalSideWidth, totalSideHeight, layoutRotation));
    		}
    	};

    	return [
    		viewBox,
    		beads,
    		gridSize,
    		layoutRotation,
    		painting,
    		totalSideWidth,
    		totalSideHeight
    	];
    }

    class Canvas extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			gridSize: 2,
    			layoutRotation: 3,
    			painting: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Canvas",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*gridSize*/ ctx[2] === undefined && !("gridSize" in props)) {
    			console.warn("<Canvas> was created without expected prop 'gridSize'");
    		}

    		if (/*layoutRotation*/ ctx[3] === undefined && !("layoutRotation" in props)) {
    			console.warn("<Canvas> was created without expected prop 'layoutRotation'");
    		}

    		if (/*painting*/ ctx[4] === undefined && !("painting" in props)) {
    			console.warn("<Canvas> was created without expected prop 'painting'");
    		}
    	}

    	get gridSize() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gridSize(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layoutRotation() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set layoutRotation(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get painting() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set painting(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.30.0 */

    const { console: console_1 } = globals;
    const file$7 = "src/App.svelte";

    // (22:1) {#if painting}
    function create_if_block$1(ctx) {
    	let paintingtoolbox;
    	let current;
    	const paintingtoolbox_spread_levels = [{ toggleStep: /*toggleStep*/ ctx[4] }];
    	let paintingtoolbox_props = {};

    	for (let i = 0; i < paintingtoolbox_spread_levels.length; i += 1) {
    		paintingtoolbox_props = assign(paintingtoolbox_props, paintingtoolbox_spread_levels[i]);
    	}

    	paintingtoolbox = new PaintingToolbox({
    			props: paintingtoolbox_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paintingtoolbox.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paintingtoolbox, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paintingtoolbox_changes = (dirty & /*toggleStep*/ 16)
    			? get_spread_update(paintingtoolbox_spread_levels, [{ toggleStep: /*toggleStep*/ ctx[4] }])
    			: {};

    			paintingtoolbox.$set(paintingtoolbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paintingtoolbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paintingtoolbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paintingtoolbox, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(22:1) {#if painting}",
    		ctx
    	});

    	return block;
    }

    // (26:1) <Workspace>
    function create_default_slot$1(ctx) {
    	let canvas;
    	let current;

    	const canvas_spread_levels = [
    		{
    			painting: /*painting*/ ctx[2],
    			gridSize: /*gridSize*/ ctx[1],
    			layoutRotation: /*layoutRotation*/ ctx[0]
    		}
    	];

    	let canvas_props = {};

    	for (let i = 0; i < canvas_spread_levels.length; i += 1) {
    		canvas_props = assign(canvas_props, canvas_spread_levels[i]);
    	}

    	canvas = new Canvas({ props: canvas_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(canvas.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(canvas, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const canvas_changes = (dirty & /*painting, gridSize, layoutRotation*/ 7)
    			? get_spread_update(canvas_spread_levels, [
    					{
    						painting: /*painting*/ ctx[2],
    						gridSize: /*gridSize*/ ctx[1],
    						layoutRotation: /*layoutRotation*/ ctx[0]
    					}
    				])
    			: {};

    			canvas.$set(canvas_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(canvas.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(canvas.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(canvas, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(26:1) <Workspace>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let main;
    	let logo;
    	let t0;
    	let configpanel;
    	let updating_gridSize;
    	let updating_layoutRotation;
    	let t1;
    	let t2;
    	let workspace;
    	let current;
    	logo = new Logo({ $$inline: true });

    	const configpanel_spread_levels = [
    		{
    			toggleStep: /*toggleStep*/ ctx[4],
    			configuring: /*configuring*/ ctx[3],
    			painting: /*painting*/ ctx[2]
    		}
    	];

    	function configpanel_gridSize_binding(value) {
    		/*configpanel_gridSize_binding*/ ctx[6].call(null, value);
    	}

    	function configpanel_layoutRotation_binding(value) {
    		/*configpanel_layoutRotation_binding*/ ctx[7].call(null, value);
    	}

    	let configpanel_props = {};

    	for (let i = 0; i < configpanel_spread_levels.length; i += 1) {
    		configpanel_props = assign(configpanel_props, configpanel_spread_levels[i]);
    	}

    	if (/*gridSize*/ ctx[1] !== void 0) {
    		configpanel_props.gridSize = /*gridSize*/ ctx[1];
    	}

    	if (/*layoutRotation*/ ctx[0] !== void 0) {
    		configpanel_props.layoutRotation = /*layoutRotation*/ ctx[0];
    	}

    	configpanel = new ConfigPanel({ props: configpanel_props, $$inline: true });
    	binding_callbacks.push(() => bind(configpanel, "gridSize", configpanel_gridSize_binding));
    	binding_callbacks.push(() => bind(configpanel, "layoutRotation", configpanel_layoutRotation_binding));
    	let if_block = /*painting*/ ctx[2] && create_if_block$1(ctx);

    	workspace = new Workspace({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(logo.$$.fragment);
    			t0 = space();
    			create_component(configpanel.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			create_component(workspace.$$.fragment);
    			attr_dev(main, "class", "svelte-1l5dwhm");
    			toggle_class(main, "painting", /*painting*/ ctx[2]);
    			toggle_class(main, "configuring", /*configuring*/ ctx[3]);
    			add_location(main, file$7, 18, 0, 514);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(logo, main, null);
    			append_dev(main, t0);
    			mount_component(configpanel, main, null);
    			append_dev(main, t1);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t2);
    			mount_component(workspace, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const configpanel_changes = (dirty & /*toggleStep, configuring, painting*/ 28)
    			? get_spread_update(configpanel_spread_levels, [
    					{
    						toggleStep: /*toggleStep*/ ctx[4],
    						configuring: /*configuring*/ ctx[3],
    						painting: /*painting*/ ctx[2]
    					}
    				])
    			: {};

    			if (!updating_gridSize && dirty & /*gridSize*/ 2) {
    				updating_gridSize = true;
    				configpanel_changes.gridSize = /*gridSize*/ ctx[1];
    				add_flush_callback(() => updating_gridSize = false);
    			}

    			if (!updating_layoutRotation && dirty & /*layoutRotation*/ 1) {
    				updating_layoutRotation = true;
    				configpanel_changes.layoutRotation = /*layoutRotation*/ ctx[0];
    				add_flush_callback(() => updating_layoutRotation = false);
    			}

    			configpanel.$set(configpanel_changes);

    			if (/*painting*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*painting*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(main, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const workspace_changes = {};

    			if (dirty & /*$$scope, painting, gridSize, layoutRotation*/ 263) {
    				workspace_changes.$$scope = { dirty, ctx };
    			}

    			workspace.$set(workspace_changes);

    			if (dirty & /*painting*/ 4) {
    				toggle_class(main, "painting", /*painting*/ ctx[2]);
    			}

    			if (dirty & /*configuring*/ 8) {
    				toggle_class(main, "configuring", /*configuring*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(configpanel.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(workspace.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(configpanel.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(workspace.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(logo);
    			destroy_component(configpanel);
    			if (if_block) if_block.d();
    			destroy_component(workspace);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let step = "configuring";
    	let gridSize = 20;
    	let layoutRotation = 90;

    	const toggleStep = () => {
    		$$invalidate(5, step = ({
    			configuring: "painting",
    			painting: "configuring"
    		})[step]);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function configpanel_gridSize_binding(value) {
    		gridSize = value;
    		$$invalidate(1, gridSize);
    	}

    	function configpanel_layoutRotation_binding(value) {
    		layoutRotation = value;
    		$$invalidate(0, layoutRotation);
    	}

    	$$self.$capture_state = () => ({
    		Logo,
    		ConfigPanel,
    		PaintingToolbox,
    		Workspace,
    		Canvas,
    		step,
    		gridSize,
    		layoutRotation,
    		toggleStep,
    		painting,
    		configuring
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(5, step = $$props.step);
    		if ("gridSize" in $$props) $$invalidate(1, gridSize = $$props.gridSize);
    		if ("layoutRotation" in $$props) $$invalidate(0, layoutRotation = $$props.layoutRotation);
    		if ("painting" in $$props) $$invalidate(2, painting = $$props.painting);
    		if ("configuring" in $$props) $$invalidate(3, configuring = $$props.configuring);
    	};

    	let painting;
    	let configuring;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*step*/ 32) {
    			 $$invalidate(2, painting = step == "painting");
    		}

    		if ($$self.$$.dirty & /*step*/ 32) {
    			 $$invalidate(3, configuring = step == "configuring");
    		}

    		if ($$self.$$.dirty & /*layoutRotation*/ 1) {
    			 console.log({ layoutRotation });
    		}
    	};

    	return [
    		layoutRotation,
    		gridSize,
    		painting,
    		configuring,
    		toggleStep,
    		step,
    		configpanel_gridSize_binding,
    		configpanel_layoutRotation_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
