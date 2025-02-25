/*
 *    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) 2017  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *            Further, all user interfaces, including but not limited to citizen facing interfaces,
 *            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *            derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *            For any further queries on attribution, including queries on brand guidelines,
 *            please contact contact@egovernments.org
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 *
 */

package org.egov.infra.persistence.validator;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.egov.infra.persistence.validator.annotation.CompositeUnique;

public class CompositeUniqueCheckValidator implements ConstraintValidator<CompositeUnique, Object> {

    private static final Logger LOG = LogManager.getLogger(CompositeUniqueCheckValidator.class);

    private CompositeUnique unique;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void initialize(final CompositeUnique unique) {
        this.unique = unique;
    }

    @Override
    public boolean isValid(final Object arg0, final ConstraintValidatorContext constraintValidatorContext) {
        try {
            final Number id = (Number) FieldUtils.readField(arg0, unique.id(), true);
            final boolean isValid = checkCompositeUniqueKey(arg0, id);
            
            if (!isValid && unique.enableDfltMsg()) {
                for (final String fieldName : unique.fields()) {
                    constraintValidatorContext.buildConstraintViolationWithTemplate(unique.message())
                            .addPropertyNode(fieldName)
                            .addConstraintViolation();
                }
            }
            
            return isValid;
        } catch (final IllegalAccessException e) {
            LOG.error("Error while validating composite unique key", e);
        }
        return false;
    }

    private boolean checkCompositeUniqueKey(final Object arg0, final Number id) throws IllegalAccessException {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        
        // Determine the entity class (supports superclass check)
        Class<?> entityClass = unique.isSuperclass() ? arg0.getClass().getSuperclass() : arg0.getClass();
        Root<?> root = query.from(entityClass);

        List<Predicate> predicates = new ArrayList<>();

        for (final String fieldName : unique.fields()) {
            final Object fieldValue = FieldUtils.readField(arg0, fieldName, true);
            if (unique.checkForNull() && fieldValue == null) {
                predicates.add(cb.isNull(root.get(fieldName)));
            } else if (fieldValue instanceof String) {
                predicates.add(cb.equal(cb.lower(root.get(fieldName)), ((String) fieldValue).toLowerCase()));
            } else {
                predicates.add(cb.equal(root.get(fieldName), fieldValue));
            }
        }

        // Exclude the current record if updating
        if (id != null) {
            predicates.add(cb.notEqual(root.get(unique.id()), id));
        }

        // Construct query
        query.select(cb.count(root)).where(predicates.toArray(new Predicate[0]));
        
        // Execute query
        Long count = entityManager.createQuery(query).getSingleResult();
        return count == 0; // Returns true if no duplicate exists
    }
}
