package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.planeta.pfum.domain.enumeration.Semestre;

/**
 * A AffectationModule.
 */
@Entity
@Table(name = "affectation_module")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "affectationmodule")
public class AffectationModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "annee")
    private String annee;

    @Enumerated(EnumType.STRING)
    @Column(name = "semestre")
    private Semestre semestre;

    @ManyToOne
    @JsonIgnoreProperties("affectationModules")
    private Module module;

    @ManyToOne
    @JsonIgnoreProperties("affectationModules")
    private Professeur professeur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnnee() {
        return annee;
    }

    public AffectationModule annee(String annee) {
        this.annee = annee;
        return this;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public Semestre getSemestre() {
        return semestre;
    }

    public AffectationModule semestre(Semestre semestre) {
        this.semestre = semestre;
        return this;
    }

    public void setSemestre(Semestre semestre) {
        this.semestre = semestre;
    }

    public Module getModule() {
        return module;
    }

    public AffectationModule module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Professeur getProfesseur() {
        return professeur;
    }

    public AffectationModule professeur(Professeur professeur) {
        this.professeur = professeur;
        return this;
    }

    public void setProfesseur(Professeur professeur) {
        this.professeur = professeur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AffectationModule)) {
            return false;
        }
        return id != null && id.equals(((AffectationModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AffectationModule{" +
            "id=" + getId() +
            ", annee='" + getAnnee() + "'" +
            ", semestre='" + getSemestre() + "'" +
            "}";
    }
}
