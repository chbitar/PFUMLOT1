package com.planeta.pfum.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Professeur.
 */
@Entity
@Table(name = "professeur")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "professeur")
public class Professeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "etablissement")
    private String etablissement;

    @Column(name = "grade")
    private String grade;

    @Column(name = "diplome")
    private String diplome;

    @Column(name = "cin")
    private String cin;

    @Column(name = "rib")
    private String rib;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "professeur")
    private Set<AffectationModule> affectationModules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Professeur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Professeur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEtablissement() {
        return etablissement;
    }

    public Professeur etablissement(String etablissement) {
        this.etablissement = etablissement;
        return this;
    }

    public void setEtablissement(String etablissement) {
        this.etablissement = etablissement;
    }

    public String getGrade() {
        return grade;
    }

    public Professeur grade(String grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getDiplome() {
        return diplome;
    }

    public Professeur diplome(String diplome) {
        this.diplome = diplome;
        return this;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public String getCin() {
        return cin;
    }

    public Professeur cin(String cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getRib() {
        return rib;
    }

    public Professeur rib(String rib) {
        this.rib = rib;
        return this;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public String getEmail() {
        return email;
    }

    public Professeur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getUser() {
        return user;
    }

    public Professeur user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<AffectationModule> getAffectationModules() {
        return affectationModules;
    }

    public Professeur affectationModules(Set<AffectationModule> affectationModules) {
        this.affectationModules = affectationModules;
        return this;
    }

    public Professeur addAffectationModule(AffectationModule affectationModule) {
        this.affectationModules.add(affectationModule);
        affectationModule.setProfesseur(this);
        return this;
    }

    public Professeur removeAffectationModule(AffectationModule affectationModule) {
        this.affectationModules.remove(affectationModule);
        affectationModule.setProfesseur(null);
        return this;
    }

    public void setAffectationModules(Set<AffectationModule> affectationModules) {
        this.affectationModules = affectationModules;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Professeur)) {
            return false;
        }
        return id != null && id.equals(((Professeur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Professeur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", etablissement='" + getEtablissement() + "'" +
            ", grade='" + getGrade() + "'" +
            ", diplome='" + getDiplome() + "'" +
            ", cin='" + getCin() + "'" +
            ", rib='" + getRib() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
