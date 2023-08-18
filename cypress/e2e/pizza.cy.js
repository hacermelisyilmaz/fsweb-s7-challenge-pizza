describe("Text Inputs", () => {
  beforeEach(() => {
    cy.visit("/pizza");
  });

  it("sipariş notu inputuna metin giriyor", () => {
    cy.get("[data-cy=note-input]").type("Lorem ipsum");
    cy.get("[data-cy=note-input]").should("have.value", "Lorem ipsum");
  });

  it("isim inputuna metin giriyor", () => {
    cy.get("[data-cy=name-input]").type("Lorem ipsum");
    cy.get("[data-cy=name-input]").should("have.value", "Lorem ipsum");
  });

  it("telefon inputuna metin giriyor", () => {
    cy.get("[data-cy=phone-input]").type("5555555555");
    cy.get("[data-cy=phone-input]").should("have.value", "5555555555");
  });

  it("adres inputuna metin giriyor", () => {
    cy.get("[data-cy=address-input]").type("Lorem ipsum");
    cy.get("[data-cy=address-input]").should("have.value", "Lorem ipsum");
  });
});

describe("Checkbox Inputs", () => {
  beforeEach(() => {
    cy.visit("/pizza");
  });

  it("checkboxlar işaretlenebiliyor", () => {
    cy.get("[data-cy=jambon-input]").check();
    cy.get("[data-cy=jambon-input]").should("be.checked");
    cy.get("[data-cy=ananas-input]").check();
    cy.get("[data-cy=ananas-input]").should("be.checked");
    cy.get("[data-cy=misir-input]").check();
    cy.get("[data-cy=misir-input]").should("be.checked");

    cy.get("input[data-cy=size-input][value=M]").check();
    cy.get("input[data-cy=size-input][value=M]").should("be.checked");

    cy.get("[data-cy=thickness-input]").select("thin");
    cy.get("[data-cy=thickness-input]").should("have.value", "thin");
  });
});

describe("Form Submission", () => {
  beforeEach(() => {
    cy.visit("/pizza");
  });

  it("Form gönderilebiliyor", () => {
    cy.get("input[data-cy=size-input][value=M]").check();
    cy.get("[data-cy=thickness-input]").select("thin");
    cy.get("[data-cy=name-input]").type("Melis Yilmaz");
    cy.get("[data-cy=phone-input]").type("5555555555");
    cy.get("[data-cy=address-input]").type("Ev adresim");

    cy.get("[data-cy=order-button]").should("not.be.disabled");
  });
});
