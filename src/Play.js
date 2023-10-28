class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4)
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)

        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.setDamping(true).setDrag(0.5)

        // add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2))
        wallA.body.setImmovable(true)

        // set up wallA to move side to side
        let wallAMinX = wallA.width / 2
        let wallAMaxX = width - wallA.width / 2
        let wallASpeed = 100 // pixels per second
        let wallADirection = 1 // 1 for right, -1 for left

        this.time.addEvent({
            delay: 1000 / 60, // 60 fps
            loop: true,
            callback: () => {
                // move wallA
                wallA.x += wallASpeed * wallADirection / 60 // 60 fps
                if (wallA.x < wallAMinX) {
                    wallA.x = wallAMinX
                    wallADirection = 1
                } else if (wallA.x > wallAMaxX) {
                    wallA.x = wallAMaxX
                    wallADirection = -1
                }
            }
        })

        // add wall B
        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width / 2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([wallA, wallB])

        // add one-way walls
        this.oneWay = this.physics.add.sprite(0, height / 4 * 3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width / 2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false


        
        // control velocity
        this.shotVelocityX = 10
        this.shotVelocityY_MIN = 500
        this.shotVelocityY_MAX = 800 

        this.input.on('pointerdown', (pointer) =>  {
            let shotDirectionY
            let shotDirectionX
            pointer.y <= this.ball.y ? shotDirectionY = 1 : shotDirectionY = -1
            
            // calculate the difference between the pointer's x position and the center of the ball
            let diffX = pointer.x - this.ball.x
            
            // set the shot direction based on the sign of diffX
            diffX >= 0 ? shotDirectionX = 1 : shotDirectionX = -1
            
            // set the ball's x velocity to be proportional to diffX and shotDirectionX
            this.ball.body.setVelocityX(Math.abs(diffX) / 2 * this.shotVelocityX * shotDirectionX)

            this.ball.body.setVelocityY(Phaser.Math.Between(this.shotVelocityY_MIN, this.shotVelocityY_MAX) * shotDirectionY)
        })

        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.destroy()
            this.resetBall()
        })

        this.physics.add.collider(this.ball, this.walls, (ball, wall) => {

        })

        this.physics.add.collider(this.ball, this.oneWay)

    
    }

    update() {


    }

    
    resetBall() {
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.setDamping(true).setDrag(0.5)

        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.destroy()
            this.resetBall()
        })

        this.physics.add.collider(this.ball, this.walls, (ball, wall) => {

        })

        this.physics.add.collider(this.ball, this.oneWay)
    }
}