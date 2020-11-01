package com.planeta.pfum.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.planeta.pfum.domain.enumeration.Programme;

/**
 * A FicheAbsence.
 */
@Entity
@Table(name = "fiche_absence")
public class FicheAbsence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_seance", nullable = false)
    private LocalDate dateSeance;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "programme")
    private Programme programme;

    @OneToOne
    @JoinColumn(unique = true)
    private Module module;

    
    public Programme getProgramme() {
        return programme;
    }

    public FicheAbsence programme(Programme programme) {
        this.programme = programme;
        return this;
    }

    public void setProgramme(Programme programme) {
        this.programme = programme;
    }
    
    @OneToMany(mappedBy = "ficheAbsence",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Absence> absences = new HashSet<>();
    
    
    @ManyToOne
    @JsonIgnoreProperties("absences")
    private User user;
   

    
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateSeance() {
        return dateSeance;
    }

    public FicheAbsence dateSeance(LocalDate dateSeance) {
        this.dateSeance = dateSeance;
        return this;
    }

    public void setDateSeance(LocalDate dateSeance) {
        this.dateSeance = dateSeance;
    }

    public Module getModule() {
        return module;
    }

    public FicheAbsence module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Set<Absence> getAbsences() {
        return absences;
    }

    public FicheAbsence absences(Set<Absence> absences) {
        this.absences = absences;
        return this;
    }

    public FicheAbsence addAbsence(Absence absence) {
        this.absences.add(absence);
        absence.setFicheAbsence(this);
        return this;
    }

    public FicheAbsence removeAbsence(Absence absence) {
        this.absences.remove(absence);
        absence.setFicheAbsence(null);
        return this;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }
    
    public User getUser() {
        return user;
    }

    public FicheAbsence user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FicheAbsence)) {
            return false;
        }
        return id != null && id.equals(((FicheAbsence) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FicheAbsence{" +
            "id=" + getId() +
            ", dateSeance='" + getDateSeance() + "'" +
            "}";
    }
}
