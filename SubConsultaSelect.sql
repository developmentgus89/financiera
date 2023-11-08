SELECT (
    SELECT COUNT(0) 
    FROM inversionistas 
    WHERE cnombre LIKE "%GUSTAVO%" 
    AND capaterno LIKE "%ANGULO%" 
    AND camaterno LIKE "%MELENDEZ%"
) AS totalrow, 
inversionistas.*
FROM inversionistas 
WHERE cnombre LIKE "%GUSTAVO%" 
AND capaterno LIKE "%ANGULO%" 
AND camaterno LIKE "%MELENDEZ%";