class Key {
  private readonly signature: number;

  constructor() {
    // nanoid было бы лучше
    this.signature = Math.random() * 1000;
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private readonly key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  // Нам же не надо знать извне что дверь открыта?
  protected door: boolean;

  // Можно ли в абстрактных классах делать конструктор, и законно ли это?
  protected constructor(protected readonly key: Key) {
    this.door = false;
  }

  tenants: Person[];

  comeIn(person: Person) {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};