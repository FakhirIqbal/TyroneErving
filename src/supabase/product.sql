-- Get All Products --
CREATE OR REPLACE FUNCTION get_all_glasses() RETURN JSONB [] LANGUAGE plpgsql AS $$
DECLARE result JSONB []
declare result JSONB;
begin
select jsonb_agg(
        jsonb_build_object(
            'id',
            g.id,
            'name',
            g.name,
            'base_price',
            g.base_price,
            'description',
            g.description,
            'avg_rating',
            g.avg_rating,
            'prescription',
            g.prescription,
            'for_gender',
            g.for_gender,
            'colors',
            (
                select jsonb_agg(c)
                from glass_colors c
                where c.glass_id = g.id
            ),
            'sizes',
            (
                select jsonb_agg(s)
                from glass_sizes s
                where s.glass_id = g.id
            )
        )
    ) into result
from glasses g;
RETURN result;
end;