class Key {
  private readonly signature: number = Math.random() * 1000;

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
  protected door: boolean = false;
  protected tenants: Person[] = [];

  // webstorm пишет что тут можно использовать protected, все равно абстрактный класс нельзя построить
  constructor(protected readonly key: Key) {}

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
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