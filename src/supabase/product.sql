CREATE OR REPLACE FUNCTION get_all_glasses(
        _limit INTEGER DEFAULT 10,
        _offset INTEGER DEFAULT 0,
        _filter TEXT DEFAULT NULL,
        _search TEXT DEFAULT NULL
    ) RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE result JSONB;
paginated_glasses JSONB;
total_count INTEGER;
BEGIN -- Get total count with optional filter and search
SELECT COUNT(*) INTO total_count
FROM glasses g
WHERE (
        (
            _filter IS NULL
            OR _filter = 'All'
            OR g.for_gender = _filter
            OR (
                _filter = 'New Arrivals'
                AND g.created_at >= NOW() - INTERVAL '3 hours'
            )
        )
    )
    AND (
        _search IS NULL
        OR _search = ''
        OR (
            g.name ILIKE '%' || _search || '%'
            OR g.description ILIKE '%' || _search || '%'
            OR g.prescription ILIKE '%' || _search || '%'
        )
    );
-- Get paginated glasses with same filter and search
SELECT jsonb_agg(glass_obj) INTO paginated_glasses
FROM (
        SELECT jsonb_build_object(
                'id',
                g.id,
                'name',
                g.name,
                'base_price',
                g.base_price,
                'description',
                g.description,
                'avg_rating',
                COALESCE(g.avg_rating, 0),
                'prescription',
                g.prescription,
                'for_gender',
                g.for_gender,
                'colors',
                (
                    SELECT COALESCE(jsonb_agg(c), '[]'::jsonb)
                    FROM glass_colors c
                    WHERE c.glass_id = g.id
                ),
                'sizes',
                (
                    SELECT COALESCE(jsonb_agg(s), '[]'::jsonb)
                    FROM glass_sizes s
                    WHERE s.glass_id = g.id
                )
            ) AS glass_obj
        FROM glasses g
        WHERE (
                (
                    _filter IS NULL
                    OR _filter = 'All'
                    OR g.for_gender = _filter
                    OR (
                        _filter = 'New Arrivals'
                        AND g.created_at >= NOW() - INTERVAL '3 hours'
                    )
                )
            )
            AND (
                _search IS NULL
                OR _search = ''
                OR (
                    g.name ILIKE '%' || _search || '%'
                    OR g.description ILIKE '%' || _search || '%'
                    OR g.prescription ILIKE '%' || _search || '%'
                )
            )
        ORDER BY g.name
        LIMIT _limit OFFSET _offset
    ) sub;
-- Handle empty result
IF paginated_glasses IS NULL THEN paginated_glasses := '[]'::jsonb;
END IF;
-- Final response
result := jsonb_build_object(
    'glasses',
    paginated_glasses,
    'pagination',
    jsonb_build_object(
        'total',
        total_count,
        'limit',
        _limit,
        'offset',
        _offset,
        'has_more',
        (_offset + _limit) < total_count
    )
);
RETURN result;
END;
$$;