import kaboom from 'kaboom';

// Import these (later)
// Layer consts
const LAYER_BG = 'bg',
    LAYER_OBJ = 'obj',
    LAYER_UI = 'ui';
// Sprite consts
const SPRITE_COIN = 'coin',
    SPRITE_EVIL_SHROOM = 'evil-shroom',
    SPRITE_BRICK = 'brick',
    SPRITE_BLOCK = 'block',
    SPRITE_MARIO = 'mario',
    SPRITE_MUSHROOM = 'mushroom',
    SPRITE_SURPRISE = 'surprise',
    SPRITE_UNBOXED = 'unboxed',
    SPRITE_PIPE_TOP_LEFT = 'pipe-top-left',
    SPRITE_PIPE_TOP_RIGHT = 'pipe-top-right',
    SPRITE_PIPE_BOTTOM_LEFT = 'pipe-bottom-left',
    SPRITE_PIPE_BOTTOM_RIGHT = 'pipe-bottom-right',
    SPRITE_BLUE_BLOCK = 'blue-block',
    SPRITE_BLUE_BRICK = 'blue-brick',
    SPRITE_BLUE_STEEL = 'blue-steel',
    SPRITE_BLUE_EVIL_SHROOM = 'blue-evil-shroom',
    SPRITE_BLUE_SURPRISE = 'blue-surprise';
// Speed consts
const SPEED_ENEMY = 20,
    SPEED_MUSHROOM = 50;
// Position consts
const FALL_DEATH = 400;

const k = kaboom({
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

k.loadRoot('https://i.imgur.com/');
k.loadSprite(SPRITE_COIN, 'wbKxhcd.png');
k.loadSprite(SPRITE_EVIL_SHROOM, 'KPO3fR9.png');
k.loadSprite(SPRITE_BRICK, 'pogC9x5.png');
k.loadSprite(SPRITE_BLOCK, 'M6rwarW.png');
k.loadSprite(SPRITE_MARIO, 'Wb1qfhK.png');
k.loadSprite(SPRITE_MUSHROOM, '0wMd92p.png');
k.loadSprite(SPRITE_SURPRISE, 'gesQ1KP.png');
k.loadSprite(SPRITE_UNBOXED, 'bdrLpi6.png');
k.loadSprite(SPRITE_PIPE_TOP_LEFT, 'ReTPiWY.png');
k.loadSprite(SPRITE_PIPE_TOP_RIGHT, 'hj2GK4n.png');
k.loadSprite(SPRITE_PIPE_BOTTOM_LEFT, 'c1cYSbt.png');
k.loadSprite(SPRITE_PIPE_BOTTOM_RIGHT, 'nqQ79eI.png');
k.loadSprite(SPRITE_BLUE_BLOCK, 'fVscIbn.png');
k.loadSprite(SPRITE_BLUE_BRICK, '3e5YRQd.png');
k.loadSprite(SPRITE_BLUE_STEEL, 'gqVoI2b.png');
k.loadSprite(SPRITE_BLUE_EVIL_SHROOM, 'SvV4ueD.png');
k.loadSprite(SPRITE_BLUE_SURPRISE, 'RMqCc1G.png');

k.scene("game", ({ score, level }) => {
    k.layers([LAYER_BG, LAYER_OBJ, LAYER_UI], LAYER_OBJ);

    const maps = [
        [
            '                                     ',
            '                                     ',
            '                                     ',
            '                                     ',
            '                                     ',
            '                                     ',
            '                                     ',
            '     %   =*=%=                       ',
            '                                     ',
            '                            -+       ',
            '                  ^    ^    ()       ',
            '==============================  =====',
        ],
        [
            '£                                            £',
            '£                                            £',
            '£                                            £',
            '£                                            £',
            '£                                            £',
            '£                                            £',
            '£           z                %@@@            £',
            '£        @%@@@@@                             £',
            '£@@@@%               @*@%@     x             £',
            '£                            x x             £',
            '£                          x x x           -+£',
            '£         z           z  x x x x           ()£',
            '!!!!!!!!!!!!   !!!!!!!!!!!!!!!!!  !!!!!!!!!!!!',
        ],
    ];

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [k.sprite(SPRITE_BLOCK), k.solid()],
        '$': [k.sprite(SPRITE_COIN), 'coin'],
        '%': [k.sprite(SPRITE_SURPRISE), k.solid(), 'coin-surprise'],
        '*': [k.sprite(SPRITE_SURPRISE), k.solid(), 'mushroom-surprise'],
        '}': [k.sprite(SPRITE_UNBOXED), k.solid()],
        '(': [k.sprite(SPRITE_PIPE_BOTTOM_LEFT), k.solid(), k.scale(0.5)],
        ')': [k.sprite(SPRITE_PIPE_BOTTOM_RIGHT), k.solid(), k.scale(0.5)],
        '-': [k.sprite(SPRITE_PIPE_TOP_LEFT), k.solid(), k.scale(0.5), 'pipe'],
        '+': [k.sprite(SPRITE_PIPE_TOP_RIGHT), k.solid(), k.scale(0.5), 'pipe'],
        '^': [k.sprite(SPRITE_EVIL_SHROOM), 'dangerous'],
        '#': [k.sprite(SPRITE_MUSHROOM), k.solid(), 'mushroom', k.body()],
        '!': [k.sprite(SPRITE_BLUE_BLOCK), k.solid(), k.scale(0.5)],
        '£': [k.sprite(SPRITE_BLUE_BRICK), k.solid(), k.scale(0.5)],
        'z': [k.sprite(SPRITE_BLUE_EVIL_SHROOM), k.solid(), k.scale(0.5), 'dangerous'],
        '@': [k.sprite(SPRITE_BLUE_SURPRISE), k.solid(), k.scale(0.5), 'coin-surprise'],
        'x': [k.sprite(SPRITE_BLUE_STEEL), k.solid(), k.scale(0.5)],
    }

    const scoreLabel = k.add([
        k.text(score),
        k.pos(4, 20),
        k.layer(LAYER_UI),
        {
            value: score,
        }
    ]);
    
    // console.log(`level: ${level} - maps.length: ${maps.length}`);
    // if(level >= maps.length) {
    //     k.go('lose', { score: scoreLabel.value });
    // }
    const gameLevel = k.addLevel(maps[level], levelCfg);

    k.add([k.text(`level ${parseInt(level, 10) + 1}`), k.pos(4,6)]);

    const player = setUpPlayer(k);

    // Spawn from boxes
    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1));
            k.destroy(obj);
            gameLevel.spawn('}', obj.gridPos.sub(0, 0));
        }
        if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1));
            k.destroy(obj);
            gameLevel.spawn('}', obj.gridPos.sub(0, 0));
        }
    });

    // Make things move
    k.action('mushroom', (m) => {
        m.move(SPEED_MUSHROOM, 0);
    });
    k.action('dangerous', (d) => {
        d.move(-SPEED_ENEMY, 0);
    });

    // Player actions
    player.action(() => {
        if(player.grounded()) {
            player.setJumping(false);
        }
    });
    player.action(() => {
        k.camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            k.go('lose', { score: scoreLabel.value });
        }
    });

    // Player collisions
    player.collides('mushroom', (m) => {
        k.destroy(m);
        player.biggify(6);
    });
    player.collides('coin', (c) => {
        k.destroy(c);
        scoreLabel.value += 10;
        scoreLabel.text = scoreLabel.value;
    });
    player.collides('dangerous', (d) => {
        if (player.isJumping()) {
            k.destroy(d);
        } else {
            k.go("lose", { score: scoreLabel.value });
        }
    });
    player.collides('pipe', () => {
        k.keyPress('down', () => {
            k.go('game', {
                score: scoreLabel.value,
                level: level++
            });
        });
    });
});

k.scene("lose", ({ score }) => {
    k.add([
        k.text(score, 32), 
        k.origin('center'),
        k.pos(k.width()/2, k.height()/2)
    ]);
})

k.start("game", { score: 0, level: 0 });

const setUpPlayer = (k) => {
    const MOVE_SPEED = 120;
    const JUMP_FORCE = 360;
    const BIG_JUMP_FORCE = 550;

    const player = k.add([
        k.sprite(SPRITE_MARIO), k.solid(),
        k.pos(30, 10),
        k.body(),
        isJumping(),
        big(),
        k.origin('bot'),
    ]);

    // Player movement / keys
    k.keyPress('space', () => {
        if(player.grounded()) {
            let currentJumpForce = JUMP_FORCE;
            player.setJumping(true);
            console.log(`Player isJumping? after space: ${player.isJumping()}`);

            if(player.isBig())
                currentJumpForce = BIG_JUMP_FORCE;

            player.jump(currentJumpForce);
        }
    });
    k.keyDown('right', () => {
        player.move(MOVE_SPEED, 0);
    })
    k.keyDown('left', () => {
        player.move(-MOVE_SPEED, 0);
    });

    return player;
}

const isJumping = () => {
    let isJ = true;
    return {
        isJumping() {
            return isJ;
        },
        setJumping(isJumping) {
            isJ = isJumping;
        }
    }
}

const big = () => {
    let timer = 0;
    let isBig = false;
    return {
        update() {
            if(isBig) {
                timer -= k.dt();
                if (timer <=0) {
                    this.smallify();
                }
            }
        },
        isBig() {
            return isBig;
        },
        smallify() {
            this.scale = k.vec2(1);
            timer = 0;
            isBig = false;
        },
        biggify(time) {
            this.scale = k.vec2(2);
            timer = time;
            isBig = true;
        }
    }
}