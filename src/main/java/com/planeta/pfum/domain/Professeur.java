package com.planeta.pfum.domain;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Professeur.
 */
@Entity
@Table(name = "professeur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Professeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    
    @Column(name = "telephone")
    private String telephone;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "professeur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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
    
    public String getTelephone() {
        return telephone;
    }

    public Professeur tel(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
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
            ", telephone='" + getTelephone()+ "'" +

            "}";
    }
}
