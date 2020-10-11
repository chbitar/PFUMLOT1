package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.planeta.pfum.domain.enumeration.Semestre;

/**
 * A Module.
 */
@Entity
@Table(name = "module")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "module")
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "nom_module")
    private String nomModule;

    @Column(name = "volume_horaire")
    private Integer volumeHoraire;

    @Enumerated(EnumType.STRING)
    @Column(name = "semestre")
    private Semestre semestre;

    @OneToMany(mappedBy = "module")
    private Set<Absence> absences = new HashSet<>();

    @OneToMany(mappedBy = "module")
    private Set<AffectationModule> affectationModules = new HashSet<>();

    @OneToMany(mappedBy = "module")
    private Set<CalendrierModule> calendrierModules = new HashSet<>();

    @OneToMany(mappedBy = "module")
    private Set<SuiviModule> suiviModules = new HashSet<>();

    @OneToMany(mappedBy = "module")
    private Set<NoteLicence> noteLicences = new HashSet<>();

    @OneToMany(mappedBy = "module")
    private Set<NoteMaster> noteMasters = new HashSet<>();

    @OneToMany(mappedBy = "module")
    private Set<NoteExecutif> noteExecutifs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("modules")
    private Filiere filiere;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomModule() {
        return nomModule;
    }

    public Module nomModule(String nomModule) {
        this.nomModule = nomModule;
        return this;
    }

    public void setNomModule(String nomModule) {
        this.nomModule = nomModule;
    }

    public Integer getVolumeHoraire() {
        return volumeHoraire;
    }

    public Module volumeHoraire(Integer volumeHoraire) {
        this.volumeHoraire = volumeHoraire;
        return this;
    }

    public void setVolumeHoraire(Integer volumeHoraire) {
        this.volumeHoraire = volumeHoraire;
    }

    public Semestre getSemestre() {
        return semestre;
    }

    public Module semestre(Semestre semestre) {
        this.semestre = semestre;
        return this;
    }

    public void setSemestre(Semestre semestre) {
        this.semestre = semestre;
    }

    public Set<Absence> getAbsences() {
        return absences;
    }

    public Module absences(Set<Absence> absences) {
        this.absences = absences;
        return this;
    }

    public Module addAbsence(Absence absence) {
        this.absences.add(absence);
        absence.setModule(this);
        return this;
    }

    public Module removeAbsence(Absence absence) {
        this.absences.remove(absence);
        absence.setModule(null);
        return this;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }

    public Set<AffectationModule> getAffectationModules() {
        return affectationModules;
    }

    public Module affectationModules(Set<AffectationModule> affectationModules) {
        this.affectationModules = affectationModules;
        return this;
    }

    public Module addAffectationModule(AffectationModule affectationModule) {
        this.affectationModules.add(affectationModule);
        affectationModule.setModule(this);
        return this;
    }

    public Module removeAffectationModule(AffectationModule affectationModule) {
        this.affectationModules.remove(affectationModule);
        affectationModule.setModule(null);
        return this;
    }

    public void setAffectationModules(Set<AffectationModule> affectationModules) {
        this.affectationModules = affectationModules;
    }

    public Set<CalendrierModule> getCalendrierModules() {
        return calendrierModules;
    }

    public Module calendrierModules(Set<CalendrierModule> calendrierModules) {
        this.calendrierModules = calendrierModules;
        return this;
    }

    public Module addCalendrierModule(CalendrierModule calendrierModule) {
        this.calendrierModules.add(calendrierModule);
        calendrierModule.setModule(this);
        return this;
    }

    public Module removeCalendrierModule(CalendrierModule calendrierModule) {
        this.calendrierModules.remove(calendrierModule);
        calendrierModule.setModule(null);
        return this;
    }

    public void setCalendrierModules(Set<CalendrierModule> calendrierModules) {
        this.calendrierModules = calendrierModules;
    }

    public Set<SuiviModule> getSuiviModules() {
        return suiviModules;
    }

    public Module suiviModules(Set<SuiviModule> suiviModules) {
        this.suiviModules = suiviModules;
        return this;
    }

    public Module addSuiviModule(SuiviModule suiviModule) {
        this.suiviModules.add(suiviModule);
        suiviModule.setModule(this);
        return this;
    }

    public Module removeSuiviModule(SuiviModule suiviModule) {
        this.suiviModules.remove(suiviModule);
        suiviModule.setModule(null);
        return this;
    }

    public void setSuiviModules(Set<SuiviModule> suiviModules) {
        this.suiviModules = suiviModules;
    }

    public Set<NoteLicence> getNoteLicences() {
        return noteLicences;
    }

    public Module noteLicences(Set<NoteLicence> noteLicences) {
        this.noteLicences = noteLicences;
        return this;
    }

    public Module addNoteLicence(NoteLicence noteLicence) {
        this.noteLicences.add(noteLicence);
        noteLicence.setModule(this);
        return this;
    }

    public Module removeNoteLicence(NoteLicence noteLicence) {
        this.noteLicences.remove(noteLicence);
        noteLicence.setModule(null);
        return this;
    }

    public void setNoteLicences(Set<NoteLicence> noteLicences) {
        this.noteLicences = noteLicences;
    }

    public Set<NoteMaster> getNoteMasters() {
        return noteMasters;
    }

    public Module noteMasters(Set<NoteMaster> noteMasters) {
        this.noteMasters = noteMasters;
        return this;
    }

    public Module addNoteMaster(NoteMaster noteMaster) {
        this.noteMasters.add(noteMaster);
        noteMaster.setModule(this);
        return this;
    }

    public Module removeNoteMaster(NoteMaster noteMaster) {
        this.noteMasters.remove(noteMaster);
        noteMaster.setModule(null);
        return this;
    }

    public void setNoteMasters(Set<NoteMaster> noteMasters) {
        this.noteMasters = noteMasters;
    }

    public Set<NoteExecutif> getNoteExecutifs() {
        return noteExecutifs;
    }

    public Module noteExecutifs(Set<NoteExecutif> noteExecutifs) {
        this.noteExecutifs = noteExecutifs;
        return this;
    }

    public Module addNoteExecutif(NoteExecutif noteExecutif) {
        this.noteExecutifs.add(noteExecutif);
        noteExecutif.setModule(this);
        return this;
    }

    public Module removeNoteExecutif(NoteExecutif noteExecutif) {
        this.noteExecutifs.remove(noteExecutif);
        noteExecutif.setModule(null);
        return this;
    }

    public void setNoteExecutifs(Set<NoteExecutif> noteExecutifs) {
        this.noteExecutifs = noteExecutifs;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public Module filiere(Filiere filiere) {
        this.filiere = filiere;
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Module)) {
            return false;
        }
        return id != null && id.equals(((Module) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Module{" +
            "id=" + getId() +
            ", nomModule='" + getNomModule() + "'" +
            ", volumeHoraire=" + getVolumeHoraire() +
            ", semestre='" + getSemestre() + "'" +
            "}";
    }
}
