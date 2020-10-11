package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

import com.planeta.pfum.domain.enumeration.Semestre;

/**
 * A SuiviModule.
 */
@Entity
@Table(name = "suivi_module")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "suivimodule")
public class SuiviModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "semestre")
    private Semestre semestre;

    
    @Lob
    @Column(name = "descriptif", nullable = false)
    private String descriptif;

    
    @Lob
    @Column(name = "observations", nullable = false)
    private String observations;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @NotNull
    @Column(name = "debut_creneau", nullable = false)
    private Instant debutCreneau;

    @NotNull
    @Column(name = "fin_creneau", nullable = false)
    private Instant finCreneau;

    @NotNull
    @Column(name = "duree", nullable = false)
    private Integer duree;

    @ManyToOne
    @JsonIgnoreProperties("suiviModules")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("suiviModules")
    private Module module;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Semestre getSemestre() {
        return semestre;
    }

    public SuiviModule semestre(Semestre semestre) {
        this.semestre = semestre;
        return this;
    }

    public void setSemestre(Semestre semestre) {
        this.semestre = semestre;
    }

    public String getDescriptif() {
        return descriptif;
    }

    public SuiviModule descriptif(String descriptif) {
        this.descriptif = descriptif;
        return this;
    }

    public void setDescriptif(String descriptif) {
        this.descriptif = descriptif;
    }

    public String getObservations() {
        return observations;
    }

    public SuiviModule observations(String observations) {
        this.observations = observations;
        return this;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Instant getDate() {
        return date;
    }

    public SuiviModule date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Instant getDebutCreneau() {
        return debutCreneau;
    }

    public SuiviModule debutCreneau(Instant debutCreneau) {
        this.debutCreneau = debutCreneau;
        return this;
    }

    public void setDebutCreneau(Instant debutCreneau) {
        this.debutCreneau = debutCreneau;
    }

    public Instant getFinCreneau() {
        return finCreneau;
    }

    public SuiviModule finCreneau(Instant finCreneau) {
        this.finCreneau = finCreneau;
        return this;
    }

    public void setFinCreneau(Instant finCreneau) {
        this.finCreneau = finCreneau;
    }

    public Integer getDuree() {
        return duree;
    }

    public SuiviModule duree(Integer duree) {
        this.duree = duree;
        return this;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public User getUser() {
        return user;
    }

    public SuiviModule user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Module getModule() {
        return module;
    }

    public SuiviModule module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SuiviModule)) {
            return false;
        }
        return id != null && id.equals(((SuiviModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SuiviModule{" +
            "id=" + getId() +
            ", semestre='" + getSemestre() + "'" +
            ", descriptif='" + getDescriptif() + "'" +
            ", observations='" + getObservations() + "'" +
            ", date='" + getDate() + "'" +
            ", debutCreneau='" + getDebutCreneau() + "'" +
            ", finCreneau='" + getFinCreneau() + "'" +
            ", duree=" + getDuree() +
            "}";
    }
}
