package com.planeta.pfum.domain;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A Absence.
 */
@Entity
@Table(name = "absence")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Absence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "date_seance")
    private Instant dateSeance;

    @OneToMany(mappedBy = "absence")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EspaceEtudiant> espaceEtudiants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("absences")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("absences")
    private Module module;

    @ManyToOne
    @JsonIgnoreProperties(value="<%= absences %>", allowSetters = true)
    private EtudiantsLicence etudiantsLicence;

    @ManyToOne
    @JsonIgnoreProperties("absences")
    private EtudiantsMaster etudiantsMaster;

    @ManyToOne
    @JsonIgnoreProperties("absences")
    private EtudiantsExecutif etudiantsExecutif;
    
    @ManyToOne
    @JsonIgnoreProperties("absences")
    private FicheAbsence ficheAbsence;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateSeance() {
        return dateSeance;
    }

    public Absence dateSeance(Instant dateSeance) {
        this.dateSeance = dateSeance;
        return this;
    }

    public void setDateSeance(Instant dateSeance) {
        this.dateSeance = dateSeance;
    }

    public Set<EspaceEtudiant> getEspaceEtudiants() {
        return espaceEtudiants;
    }

    public Absence espaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
        return this;
    }

    public Absence addEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.add(espaceEtudiant);
        espaceEtudiant.setAbsence(this);
        return this;
    }

    public Absence removeEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.remove(espaceEtudiant);
        espaceEtudiant.setAbsence(null);
        return this;
    }

    public void setEspaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
    }

    public User getUser() {
        return user;
    }

    public Absence user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Module getModule() {
        return module;
    }

    public Absence module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public EtudiantsLicence getEtudiantsLicence() {
        return etudiantsLicence;
    }

    public Absence etudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicence = etudiantsLicence;
        return this;
    }

    public void setEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicence = etudiantsLicence;
    }

    public EtudiantsMaster getEtudiantsMaster() {
        return etudiantsMaster;
    }

    public Absence etudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMaster = etudiantsMaster;
        return this;
    }

    public void setEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMaster = etudiantsMaster;
    }

    public EtudiantsExecutif getEtudiantsExecutif() {
        return etudiantsExecutif;
    }

    public Absence etudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutif = etudiantsExecutif;
        return this;
    }

    public void setEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutif = etudiantsExecutif;
    }
    
    public FicheAbsence getFicheAbsence() {
        return ficheAbsence;
    }

    public FicheAbsence ficheAbsenc(FicheAbsence ficheAbsence) {
        this.ficheAbsence = ficheAbsence;
        return ficheAbsence;
    }

    public void setFicheAbsence(FicheAbsence ficheAbsence) {
        this.ficheAbsence = ficheAbsence;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Absence)) {
            return false;
        }
        return id != null && id.equals(((Absence) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Absence{" +
            "id=" + getId() +
            ", dateSeance='" + getDateSeance() + "'" +
            "}";
    }
}
