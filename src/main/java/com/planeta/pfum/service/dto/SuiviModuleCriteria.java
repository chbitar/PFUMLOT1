package com.planeta.pfum.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import com.planeta.pfum.domain.enumeration.Semestre;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.InstantFilter;

/**
 * Criteria class for the {@link com.planeta.pfum.domain.SuiviModule} entity. This class is used
 * in {@link com.planeta.pfum.web.rest.SuiviModuleResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /suivi-modules?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class SuiviModuleCriteria implements Serializable, Criteria {
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

    private SemestreFilter semestre;

    private InstantFilter date;

    private InstantFilter debutCreneau;

    private InstantFilter finCreneau;

    private IntegerFilter duree;

    private LongFilter userId;

    private LongFilter moduleId;

    public SuiviModuleCriteria(){
    }

    public SuiviModuleCriteria(SuiviModuleCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.semestre = other.semestre == null ? null : other.semestre.copy();
        this.date = other.date == null ? null : other.date.copy();
        this.debutCreneau = other.debutCreneau == null ? null : other.debutCreneau.copy();
        this.finCreneau = other.finCreneau == null ? null : other.finCreneau.copy();
        this.duree = other.duree == null ? null : other.duree.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.moduleId = other.moduleId == null ? null : other.moduleId.copy();
    }

    @Override
    public SuiviModuleCriteria copy() {
        return new SuiviModuleCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public SemestreFilter getSemestre() {
        return semestre;
    }

    public void setSemestre(SemestreFilter semestre) {
        this.semestre = semestre;
    }

    public InstantFilter getDate() {
        return date;
    }

    public void setDate(InstantFilter date) {
        this.date = date;
    }

    public InstantFilter getDebutCreneau() {
        return debutCreneau;
    }

    public void setDebutCreneau(InstantFilter debutCreneau) {
        this.debutCreneau = debutCreneau;
    }

    public InstantFilter getFinCreneau() {
        return finCreneau;
    }

    public void setFinCreneau(InstantFilter finCreneau) {
        this.finCreneau = finCreneau;
    }

    public IntegerFilter getDuree() {
        return duree;
    }

    public void setDuree(IntegerFilter duree) {
        this.duree = duree;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getModuleId() {
        return moduleId;
    }

    public void setModuleId(LongFilter moduleId) {
        this.moduleId = moduleId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final SuiviModuleCriteria that = (SuiviModuleCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(semestre, that.semestre) &&
            Objects.equals(date, that.date) &&
            Objects.equals(debutCreneau, that.debutCreneau) &&
            Objects.equals(finCreneau, that.finCreneau) &&
            Objects.equals(duree, that.duree) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(moduleId, that.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        semestre,
        date,
        debutCreneau,
        finCreneau,
        duree,
        userId,
        moduleId
        );
    }

    @Override
    public String toString() {
        return "SuiviModuleCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (semestre != null ? "semestre=" + semestre + ", " : "") +
                (date != null ? "date=" + date + ", " : "") +
                (debutCreneau != null ? "debutCreneau=" + debutCreneau + ", " : "") +
                (finCreneau != null ? "finCreneau=" + finCreneau + ", " : "") +
                (duree != null ? "duree=" + duree + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
                (moduleId != null ? "moduleId=" + moduleId + ", " : "") +
            "}";
    }

}
