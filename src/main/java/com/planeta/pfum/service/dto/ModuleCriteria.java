package com.planeta.pfum.service.dto;

import java.io.Serializable;
import java.util.Objects;

import com.planeta.pfum.domain.enumeration.Semestre;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.planeta.pfum.domain.Module} entity. This class is used
 * in {@link com.planeta.pfum.web.rest.ModuleResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /modules?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ModuleCriteria implements Serializable, Criteria {
    /**
     * Class for filtering Semestre
     */
    public static class SemestreFilter extends Filter<Semestre> {

        public SemestreFilter() {
        }

        public SemestreFilter(SemestreFilter filter) {
            super(filter);
        }

        @Override
        public SemestreFilter copy() {
            return new SemestreFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nomModule;

    private IntegerFilter volumeHoraire;

    private SemestreFilter semestre;

    private LongFilter absenceId;

    private LongFilter affectationModuleId;

    private LongFilter calendrierModuleId;

    private LongFilter suiviModuleId;

    private LongFilter noteLicenceId;

    private LongFilter noteMasterId;

    private LongFilter noteExecutifId;

    private LongFilter filiereId;

    public ModuleCriteria(){
    }

    public ModuleCriteria(ModuleCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nomModule = other.nomModule == null ? null : other.nomModule.copy();
        this.volumeHoraire = other.volumeHoraire == null ? null : other.volumeHoraire.copy();
        this.semestre = other.semestre == null ? null : other.semestre.copy();
        this.absenceId = other.absenceId == null ? null : other.absenceId.copy();
        this.affectationModuleId = other.affectationModuleId == null ? null : other.affectationModuleId.copy();
        this.calendrierModuleId = other.calendrierModuleId == null ? null : other.calendrierModuleId.copy();
        this.suiviModuleId = other.suiviModuleId == null ? null : other.suiviModuleId.copy();
        this.noteLicenceId = other.noteLicenceId == null ? null : other.noteLicenceId.copy();
        this.noteMasterId = other.noteMasterId == null ? null : other.noteMasterId.copy();
        this.noteExecutifId = other.noteExecutifId == null ? null : other.noteExecutifId.copy();
        this.filiereId = other.filiereId == null ? null : other.filiereId.copy();
    }

    @Override
    public ModuleCriteria copy() {
        return new ModuleCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNomModule() {
        return nomModule;
    }

    public void setNomModule(StringFilter nomModule) {
        this.nomModule = nomModule;
    }

    public IntegerFilter getVolumeHoraire() {
        return volumeHoraire;
    }

    public void setVolumeHoraire(IntegerFilter volumeHoraire) {
        this.volumeHoraire = volumeHoraire;
    }

    public SemestreFilter getSemestre() {
        return semestre;
    }

    public void setSemestre(SemestreFilter semestre) {
        this.semestre = semestre;
    }

    public LongFilter getAbsenceId() {
        return absenceId;
    }

    public void setAbsenceId(LongFilter absenceId) {
        this.absenceId = absenceId;
    }

    public LongFilter getAffectationModuleId() {
        return affectationModuleId;
    }

    public void setAffectationModuleId(LongFilter affectationModuleId) {
        this.affectationModuleId = affectationModuleId;
    }

    public LongFilter getCalendrierModuleId() {
        return calendrierModuleId;
    }

    public void setCalendrierModuleId(LongFilter calendrierModuleId) {
        this.calendrierModuleId = calendrierModuleId;
    }

    public LongFilter getSuiviModuleId() {
        return suiviModuleId;
    }

    public void setSuiviModuleId(LongFilter suiviModuleId) {
        this.suiviModuleId = suiviModuleId;
    }

    public LongFilter getNoteLicenceId() {
        return noteLicenceId;
    }

    public void setNoteLicenceId(LongFilter noteLicenceId) {
        this.noteLicenceId = noteLicenceId;
    }

    public LongFilter getNoteMasterId() {
        return noteMasterId;
    }

    public void setNoteMasterId(LongFilter noteMasterId) {
        this.noteMasterId = noteMasterId;
    }

    public LongFilter getNoteExecutifId() {
        return noteExecutifId;
    }

    public void setNoteExecutifId(LongFilter noteExecutifId) {
        this.noteExecutifId = noteExecutifId;
    }

    public LongFilter getFiliereId() {
        return filiereId;
    }

    public void setFiliereId(LongFilter filiereId) {
        this.filiereId = filiereId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ModuleCriteria that = (ModuleCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nomModule, that.nomModule) &&
            Objects.equals(volumeHoraire, that.volumeHoraire) &&
            Objects.equals(semestre, that.semestre) &&
            Objects.equals(absenceId, that.absenceId) &&
            Objects.equals(affectationModuleId, that.affectationModuleId) &&
            Objects.equals(calendrierModuleId, that.calendrierModuleId) &&
            Objects.equals(suiviModuleId, that.suiviModuleId) &&
            Objects.equals(noteLicenceId, that.noteLicenceId) &&
            Objects.equals(noteMasterId, that.noteMasterId) &&
            Objects.equals(noteExecutifId, that.noteExecutifId) &&
            Objects.equals(filiereId, that.filiereId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nomModule,
        volumeHoraire,
        semestre,
        absenceId,
        affectationModuleId,
        calendrierModuleId,
        suiviModuleId,
        noteLicenceId,
        noteMasterId,
        noteExecutifId,
        filiereId
        );
    }

    @Override
    public String toString() {
        return "ModuleCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nomModule != null ? "nomModule=" + nomModule + ", " : "") +
                (volumeHoraire != null ? "volumeHoraire=" + volumeHoraire + ", " : "") +
                (semestre != null ? "semestre=" + semestre + ", " : "") +
                (absenceId != null ? "absenceId=" + absenceId + ", " : "") +
                (affectationModuleId != null ? "affectationModuleId=" + affectationModuleId + ", " : "") +
                (calendrierModuleId != null ? "calendrierModuleId=" + calendrierModuleId + ", " : "") +
                (suiviModuleId != null ? "suiviModuleId=" + suiviModuleId + ", " : "") +
                (noteLicenceId != null ? "noteLicenceId=" + noteLicenceId + ", " : "") +
                (noteMasterId != null ? "noteMasterId=" + noteMasterId + ", " : "") +
                (noteExecutifId != null ? "noteExecutifId=" + noteExecutifId + ", " : "") +
                (filiereId != null ? "filiereId=" + filiereId + ", " : "") +
            "}";
    }

}
